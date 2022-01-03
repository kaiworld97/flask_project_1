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
from bson.objectid import ObjectId

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
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = db.user.find_one({"id": payload['id']}, {'_id': False, 'pw': False})
        img_binary = fs.get(user['img'])
        base64_data = codecs.encode(img_binary.read(), 'base64')
        user_image = base64_data.decode('utf-8')
        user['img'] = user_image
        rows = []
        info = db.feed
        # user = db.user.find_one({'id': 'carrot_vely'}, {'_id': False, 'pw': False})
        # print(user[])
        for x in info.find():
            img_binary = fs.get(x['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            x['img'] = image
            x_user = db.user.find_one({'id': x['id']}, {'_id': False, 'pw': False, 'like_feed': False})
            img_binary = fs.get(x_user['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            x_user['img'] = image
            x['write_user'] = x_user
            # for a in db.comment.find():
            #     print(a)w
            comments = list(db.comment.find({'feed_id': str(x['_id'])}))
            comment = []
            if len(comments) != 0:
                for b in comments:
                    comments_user = db.user.find_one({'id': b['id']}, {'_id': False, 'pw': False, 'like_feed': False})
                    b['nick'] = comments_user['nick']
                    if comments_user['img'] == 'x':
                        b['img'] = comments_user['img']
                    else:
                        img_binary = fs.get(comments_user['img'])
                        base64_data = codecs.encode(img_binary.read(), 'base64')
                        image = base64_data.decode('utf-8')
                        b['img'] = image
                    t = str(
                        datetime.fromtimestamp(
                            round(datetime.now().timestamp() * 1000) / 1000.0) - datetime.fromtimestamp(
                            int(b['date']) / 1000.0))
                    if 'day,' in t.split(' '):
                        time = t.split(' ')[0] + '일 전'
                    else:
                        if t.split('.')[0].split(':')[0] == '0' and t.split('.')[0].split(':')[1] == '00':
                            time = str(int(t.split('.')[0].split(':')[2])) + '초 전'
                        elif t.split('.')[0].split(':')[0] == '0' and t.split('.')[0].split(':')[1] != '00':
                            time = str(int(t.split('.')[0].split(':')[1])) + '분 전'
                        else:
                            time = str(int(t.split('.')[0].split(':')[0])) + '시간 전'
                        #
                        # time = t.split(' ')[0]

                    b['time'] = time
                    comment.append(b)
                x['comments'] = comment

            else:
                x['comments'] = []
                comments_user = {'img': 'x'}
                x['comments_user'] = comments_user

            t = str(datetime.fromtimestamp(round(datetime.now().timestamp() * 1000) / 1000.0) - datetime.fromtimestamp(
                int(x['date']) / 1000.0))
            if 'day,' in t.split(' '):
                time = t.split(' ')[0] + '일 전'
            else:
                if t.split('.')[0].split(':')[0] == '0' and t.split('.')[0].split(':')[1] == '00':
                    time = str(int(t.split('.')[0].split(':')[2])) + '초 전'
                elif t.split('.')[0].split(':')[0] == '0' and t.split('.')[0].split(':')[1] != '00':
                    time = str(int(t.split('.')[0].split(':')[1])) + '분 전'
                else:
                    time = str(int(t.split('.')[0].split(':')[0])) + '시간 전'
                #
                # time = t.split(' ')[0]
            x['time'] = time

            try:
                like = list(db.like.find({'feed_id': str(x['_id'])}))
                like_count = len(like)
                x['like_count'] = like_count
            except:
                x['like_count'] = 0

            if db.like.find_one({'id': user['id'], 'feed_id': str(x['_id'])}) is None:
                x['like_this'] = False
            else:
                x['like_this'] = True
            # if str(x['_id']) in user['like_feed']:
            #     x['like_this'] = True
            # else:
            #     x['like_this'] = False

            rows.append(x)
        print(rows)
        return render_template('index.html', html='index', rows=rows, user=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/recipe')
def recipe():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = db.user.find_one({"id": payload['id']}, {'_id': False, 'pw': False})
        if user['img'] == 'x':
            pass
        else:
            img_binary = fs.get(user['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            user['img'] = image
        return render_template('recipe.html', html='recipe', user=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/follow', methods=['POST'])
def follow():
    followed_id_receive = request.form['followed_id']
    id_receive = request.form['id']
    type_receive = request.form['type']
    if type_receive == 'up':
        doc = {
            'follow_id': id_receive,
            'followed_id': followed_id_receive
        }
        db.follow.insert_one(doc)
    else:
        db.follow.delete_one({'followed_id': followed_id_receive, 'follow_id': id_receive})
    return jsonify({'msg': 'saved!!!!'})


# @app.route('/write_feed')
# def write_feed():
#     token_receive = request.cookies.get('mytoken')
#     try:
#         payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
#         user = db.user.find_one({"id": payload['id']}, {'_id': False, 'pw': False})
#         # user = db.user.find_one({'id': 'carrot_vely'}, {'_id': False, 'pw': False})
#         return render_template('', html='write_feed', user=user)
#     except jwt.ExpiredSignatureError:
#         return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
#     except jwt.exceptions.DecodeError:
#         return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

@app.route('/feed_upload', methods=['POST'])
def file_upload():
    date_receive = request.form['date_give']
    content_receive = request.form['content_give']
    id_receive = request.form['id_give']
    user_id = db.user.find_one({'nick': id_receive})['id']
    file = request.files['file_give']
    # gridfs 활용해서 이미지 분할 저장
    fs_image_id = fs.put(file)
    feed_doc = {
        'id': user_id,
        'content': content_receive,
        'date': date_receive,
        'img': fs_image_id
    }
    db.feed.insert_one(feed_doc)

    return jsonify({'msg': 'saved!!!!'})


@app.route('/feed_like', methods=['POST'])
def feed_like():
    feed_id_receive = request.form['feed_id']
    id_receive = request.form['id']
    type_receive = request.form['type']
    if type_receive == 'up':
        if db.like.find_one({'feed_id': feed_id_receive, 'id': id_receive}) is None:
            doc = {
                'id': id_receive,
                'feed_id': feed_id_receive
            }
            db.like.insert_one(doc)
        else:
            pass
    else:
        db.like.delete_one({'feed_id': feed_id_receive, 'id': id_receive})
    return jsonify({'msg': 'saved!!!!'})


@app.route('/feed_read', methods=['GET'])
def feed_load():
    # 사진하나 불러오기
    feed_info = db.feed.find_one({'id': 'carrot_vely'})
    # for a in feed_info:
    #     print(a['img'])
    fs = gridfs.GridFS(db)
    data = feed_info['img']
    data = fs.get(data)
    # print(data)
    data = data.read()
    # print('carrot_vely', io.BytesIO(data).read())

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


@app.route("/feed_delete", methods=["POST"])
def feed_delete():
    feed_id_receive = request.form['feed_id']
    img_id = db.feed.find_one({'_id': ObjectId(feed_id_receive)})
    fs.delete(img_id['img'])
    db.comment.delete_many({'feed_id': feed_id_receive})
    db.like.delete_many({'feed_id': feed_id_receive})
    db.feed.delete_one({'_id': ObjectId(feed_id_receive)})
    return jsonify({'msg': '피드 삭제!'})


@app.route("/feed_update", methods=["POST"])
def feed_update():
    feed_id_receive = request.form['feed_id']
    feed_update_receive = request.form['feed_update']
    img_id = db.feed.find_one({'_id': ObjectId(feed_id_receive)})['img']
    fs.delete(img_id)
    db.feed.update_one({'_id': ObjectId(feed_id_receive)}, {"$set": {"content": feed_update_receive}})
    return jsonify({'msg': '피드 수정!'})


@app.route('/auction')
def auction():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = db.user.find_one({"id": payload['id']}, {'_id': False, 'pw': False})
        if user['img'] == 'x':
            pass
        else:
            img_binary = fs.get(user['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            user['img'] = image
        return render_template('auction.html', html='auction', user=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

@app.route('/mypage/<keyword>')
def mypage(keyword):
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user = db.user.find_one({"id": payload['id']}, {'_id': False, 'pw': False})
        if user['img'] == 'x':
            pass
        else:
            img_binary = fs.get(user['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            user['img'] = image
        feedrows = []
        feedrow = []
        info = db.feed
        # info = db.feed.find({'id': 'carrot_vely'})
        # user = db.user.find_one({'id': 'carrot_vely'}, {'_id': False, 'pw': False})
        for x in info.find({"id": user['id']}):
            img_binary = fs.get(x['img'])
            base64_data = codecs.encode(img_binary.read(), 'base64')
            image = base64_data.decode('utf-8')
            x['img'] = image
            feedrow.append(x)
            if len(feedrow) == 3:
                feedrows.append(feedrow)
                feedrow = []
        if len(feedrow) == 2 or len(feedrow) == 1:
            feedrows.append(feedrow)
        return render_template('mypage.html', html='mypage', feedrows=feedrows, reciperows=feedrows, likerows=feedrows,
                               user=user)
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/api/register', methods=['POST'])
def api_register():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    nickname_receive = request.form['nickname_give']
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    db.user.insert_one(
        {'id': id_receive, 'pw': pw_hash, 'nick': nickname_receive, 'img': 'x',
         'like_feed': []})
    return jsonify({'result': 'success'})


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
        # token = jwt.encode(payload, SECRET_KEY, algorithm='HS256').decode('utf-8')
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
    feed_id_receive = request.form['feed_id_give']
    id_receive = request.form['id_give']
    date_receive = request.form['date_give']
    comment_id = feed_id_receive + '_' + id_receive + '_' + date_receive
    # comment_list = list(db.comment.find({}, {'_id': False}))
    # count = len(comment_list) + 1
    doc = {
        'comment': comment_receive,
        'feed_id': feed_id_receive,
        'id': id_receive,
        'date': date_receive,
        'comment_id': comment_id
    }
    if db.comment.find_one({'id': id_receive, 'feed_id': feed_id_receive, 'comment': comment_receive}) is None:
        db.comment.insert_one(doc)
        return jsonify({'msg': '댓글 작성!'})
    else:
        return jsonify({'msg': '중복 댓글 입니다!'})


@app.route("/comments", methods=["GET"])
def comment_get():
    comment_list = list(db.comment.find({}, {'_id': False}))
    return jsonify({'comments': comment_list})


@app.route("/comments/delete", methods=["POST"])
def comment_delete_post():
    comment_id_receive = request.form['comment_id']
    db.comment.delete_one({'comment_id': comment_id_receive})
    return jsonify({'msg': '댓글 삭제!'})


@app.route("/comments/update", methods=["POST"])
def comment_update_post():
    comment_id_receive = request.form['comment_id']
    comment_receive = request.form['update_comment']
    db.comment.update_one({'comment_id': comment_id_receive}, {"$set": {"comment": comment_receive}})
    return jsonify({'msg': '댓글 수정!'})

@app.route("/user_update", methods=["POST"])
def user_update():
    nick_receive = request.form['nick_give']
    id_receive = request.form['id_give']
    file = request.files['file_give']
    # gridfs 활용해서 이미지 분할 저장
    fs_image_id = fs.put(file)
    user_info = db.user.find_one({'id': id_receive})
    if user_info['img'] == 'x':
        db.user.update_one({'id': id_receive}, {"$set": {"nick": nick_receive, 'img': fs_image_id}})
    else:
        fs.delete(user_info['img'])
        db.user.update_one({'id': id_receive}, {"$set": {"nick": nick_receive, 'img': fs_image_id}})
    return jsonify({'msg': '수정 완료!'})

@app.route('/register')
def register():
    return render_template('register.html')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
