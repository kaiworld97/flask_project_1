from pymongo import MongoClient
import jwt
import hashlib
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_file
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import certifi
import gridfs
import codecs
import io

client = MongoClient('mongodb+srv://test:sparta@cluster0.mr6mv.mongodb.net/Cluster0?retryWrites=true&w=majority',
                     tlsCAFile=certifi.where())
db = client.dbsparta

app = Flask(__name__)
fs = gridfs.GridFS(db)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['UPLOAD_FOLDER'] = "./static/profile_pics"

SECRET_KEY = 'SPARTA'


# client = MongoClient('내AWS아이피', 27017, username="아이디", password="비밀번호")
# db = client.dbsparta_plus_week4


@app.route('/')
def home():
    # token_receive = request.cookies.get('mytoken')
    # try:
    #     payload = jwt.decode(token_receive, ECRET_KEY, algorithms=['HS256'])
    #
    #     return render_template('index.html')
    # except jwt.ExpiredSignatureError:
    #     return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    # except jwt.exceptions.DecodeError:
    #     return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))
    return render_template('index.html', html='index')


@app.route('/recipe')
def recipe():
    return render_template('recipe.html', html='recipe')


@app.route('/write_feed')
def write_feed():
    return render_template('write_feed.html', html='write_feed')


@app.route('/feed_upload', methods=['POST'])
def file_upload():
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    id_receive = request.form['id_give']

    file = request.files['file_give']
    # gridfs 활용해서 이미지 분할 저장
    fs_image_id = fs.put(file)

    # db 추가
    doc = {
        'id': id_receive,
        'content': content_receive,
        'title': title_receive,
        'img': fs_image_id
    }
    db.users.insert_one(doc)

    return jsonify({'msg': 'saved!!!!'})


@app.route('/feed_read', methods=['GET'])
def feed_load():
    # 사진하나 불러오기
    feed_info = db.users.find_one({'id': 'carrot_vely'})
    fs = gridfs.GridFS(db)
    data = feed_info['img']
    data = fs.get(data)
    print(data)
    data = data.read()
    print('carrot_vely', io.BytesIO(data).read())

    return send_file(io.BytesIO(data), mimetype='image.png')

    # feed_info = db.users.find({'title': '귀를의심.png'})
    # fs = gridfs.GridFS(db)
    # data = feed_info['img']
    # data = fs.get(data)
    # print(data)
    # data = data.read()
    # print('carrot_vely', io.BytesIO(data).read())
    #
    # return send_file(io.BytesIO(data), mimetype='image.png')


@app.route('/write_recipe')
def write_recipe():
    return render_template('write_recipe.html', html='write_recipe')


@app.route('/auction')
def auction():
    return render_template('auction.html', html='auction')


@app.route('/mypage')
def mypage():
    return render_template('mypage.html', html='mypage')


@app.route('/camera')
def camera():
    return render_template('camera.html', html='camera')

@app.route('/test')
def test():
    return render_template('test.html')

##  로그인을 위한 API ##

@app.route('/api/register', methods=['POST'])
def api_register():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    nickname_receive = request.form['nickname_give']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    db.user.insert_one({'id': id_receive, 'pw': pw_hash, 'nick': nickname_receive})

    return jsonify({'result': 'success'})

@app.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    result = db.user.find_one({'id': id_receive, 'pw': pw_hash})
    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'result': 'success', 'token': token})

    else:
            return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})

@app.route('/api/nick', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)
        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})

        return jsonify({'result': 'success', 'nickname': userinfo['nick']})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})



@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', html='login', msg=msg)


@app.route('/sign_in', methods=['POST'])
def sign_in():
    # 로그인
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    result = db.user.find_one({'id': username_receive, 'pw': pw_hash})
    print(result)
    if result is not None:
        payload = {
            'id': username_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    doc = {
        "username": username_receive,  # 아이디
        "password": password_hash,  # 비밀번호
        "profile_name": username_receive,  # 프로필 이름 기본값은 아이디
        "profile_pic": "",  # 프로필 사진 파일 이름
        "profile_pic_real": "profile_pics/profile_placeholder.png",  # 프로필 사진 기본 이미지
        "profile_info": ""  # 프로필 한 마디
    }
    db.users.insert_one(doc)
    return jsonify({'result': 'success'})


@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    # ID 중복확인
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"username": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})
    # return jsonify({'result': 'success'})



@app.route("/comments", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give']
    comment_list = list(db.comment.find({}, {'_id': False}))
    count = len(comment_list) + 1
    doc = {'comment': comment_receive,
           'num': count}
    db.comment.insert_one(doc)
    return jsonify({'msg': '댓글 작성!'})


@app.route("/comments", methods=["GET"])
def comment_get():
    comment_list = list(db.comment.find({}, {'_id': False}))
    return jsonify({'comments': comment_list})


@app.route("/comments/delete", methods=["POST"])
def comment_delete_post():
    num_receive = request.form['num_give']
    db.comment.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '댓글 삭제!'})


@app.route('/camerafeedupload', methods=['POST'])
def camerafeedupload():
    camerafeed_receive = request.form['camerafeed_give']
    file = request.files['file_give']

    fs_image_id = fs.put(file)

    doc = {
        'camerafeed': camerafeed_receive,
        'img': fs_image_id
    }
    db.camp2.insert_one(doc)

    return jsonify({'result': 'success'})


@app.route('/fileshow/<title>')
def file_show(title):

    img_info = db.camp2.find_one({'title': title})
    img_binary = fs.get(img_info['img'])

    base64_data = codecs.encode(img_binary.read(), 'base64')
    image = base64_data.decode('utf-8')

    return render_template('showimg.html', img=image)

@app.route('/register')   ###들어갈 링크 명시
def register():
    return render_template('register.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

# #################################
# ##  HTML을 주는 부분             ##
# #################################
# @app.route('/')
# def home():
#     # 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져옵니다.
#     token_receive = request.cookies.get('mytoken')
#     try:
#         # 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줍니다!
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         user_info = db.user.find_one({"id": payload['id']})
#         return render_template('index.html', nickname=user_info["nick"])
#     # 만약 해당 token의 로그인 시간이 만료되었다면, 아래와 같은 코드를 실행합니다.
#     except jwt.ExpiredSignatureError:
#         return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
#     except jwt.exceptions.DecodeError:
#         # 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행합니다.
#         return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))
#
#
# @app.route('/login')
# def login():
#     msg = request.args.get("msg")
#     return render_template('login.html', msg=msg)
#
#
# @app.route('/register')   ###들어갈 링크 명시
# def register():
#     return render_template('register.html')

#
# #################################
# ##  로그인을 위한 API            ##
# #################################
#
# # [회원가입 API]
# # id, pw, nickname을 받아서, mongoDB에 저장합니다.
# # 저장하기 전에, pw를 sha256 방법(=단방향 암호화. 풀어볼 수 없음)으로 암호화해서 저장합니다.
# @app.route('/api/register', methods=['POST'])
# def api_register():
#     id_receive = request.form['id_give']
#     pw_receive = request.form['pw_give']
#     nickname_receive = request.form['nickname_give']
#
#     pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
#
#     db.user.insert_one({'id': id_receive, 'pw': pw_hash, 'nick': nickname_receive})
#
#     return jsonify({'result': 'success'})
#
#
# # [로그인 API]
# # id, pw를 받아서 맞춰보고, 토큰을 만들어 발급합니다.
# @app.route('/api/login', methods=['POST'])
# def api_login():
#     id_receive = request.form['id_give']
#     pw_receive = request.form['pw_give']
#
#     # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
#     pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
#
#     # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
#     result = db.user.find_one({'id': id_receive, 'pw': pw_hash})
#
#     # 찾으면 JWT 토큰을 만들어 발급합니다.
#     if result is not None:
#         # JWT 토큰에는, payload와 시크릿키가 필요합니다.
#         # 시크릿키가 있어야 토큰을 디코딩(=암호화 풀기)해서 payload 값을 볼 수 있습니다.
#         # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
#         # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
#         payload = {
#             'id': id_receive,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
#         }
#         token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
#
#         # token을 줍니다.
#         return jsonify({'result': 'success', 'token': token})
#     # 찾지 못하면
#     else:
#         return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})
#
#
# # [유저 정보 확인 API]
# # 로그인된 유저만 call 할 수 있는 API입니다.
# # 유효한 토큰을 줘야 올바른 결과를 얻어갈 수 있습니다.
# # (그렇지 않으면 남의 장바구니라든가, 정보를 누구나 볼 수 있겠죠?)
# @app.route('/api/nick', methods=['GET'])
# def api_valid():
#     token_receive = request.cookies.get('mytoken')
#
#     # try / catch 문?
#     # try 아래를 실행했다가, 에러가 있으면 except 구분으로 가란 얘기입니다.
#
#     try:
#         # token을 시크릿키로 디코딩합니다.
#         # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         print(payload)
#
#         # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
#         # 여기에선 그 예로 닉네임을 보내주겠습니다.
#         userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
#         return jsonify({'result': 'success', 'nickname': userinfo['nick']})
#     except jwt.ExpiredSignatureError:
#         # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
#         return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
#     except jwt.exceptions.DecodeError:
#         return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})
#
#
# if __name__ == '__main__':
#     app.run('0.0.0.0', port=5000, debug=True)
