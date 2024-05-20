# Flask

- Flask 개요
  - WSGI란 
- Flask 기본 구성 요소
- Flask의 주요 기능
- Flask의 고급 기능
- Flask 사용 시 주의점
- Flask 예시 프로젝트

## 1. Flask 개요

Flask는 Python으로 작성된 마이크로 웹 프레임워크로, 간단하고 유연한 웹 개발을 지원합니다. Flask는 최소한의 구성 요소로 시작하여 필요한 기능을 확장할 수 있는 구조를 가지고 있습니다.

- 특징:
- 경량 프레임워크
- 높은 유연성
- 플러그인 시스템
- WSGI 호환

### WSGI란 무엇인가?
WSGI(Web Server Gateway Interface)는 Python에서 웹 애플리케이션과 웹 서버 간의 인터페이스 표준을 정의하는 PEP 3333에 명시된 규격입니다. WSGI는 Python 웹 애플리케이션이 웹 서버와 상호작용하는 방식을 정의하여 호환성을 보장하고, 웹 서버와 애플리케이션을 분리하여 서로 독립적으로 개발 및 배포할 수 있도록 합니다.

#### WSGI의 필요성
웹 서버는 HTTP 요청을 처리하고 응답을 생성하는 역할을 합니다. Python 웹 애플리케이션은 이러한 요청을 받아 처리하고 응답을 반환해야 합니다. WSGI는 웹 서버와 Python 애플리케이션 간의 표준 인터페이스를 제공하여 서로 다른 웹 서버와 애플리케이션이 호환되도록 합니다.

#### WSGI의 동작 방식
WSGI는 두 부분으로 구성됩니다:

1. WSGI 서버: 웹 서버가 WSGI 서버 역할을 합니다. 예를 들어, Gunicorn, uWSGI, Waitress 등이 있습니다. 이 서버는 HTTP 요청을 받아 WSGI 애플리케이션에 전달합니다.
2. WSGI 애플리케이션: Python으로 작성된 웹 애플리케이션으로, WSGI 서버로부터 요청을 받아 응답을 생성합니다.

WSGI 애플리케이션은 다음과 같은 인터페이스를 제공합니다:

- 애플리케이션 객체: environ과 start_response라는 두 개의 매개변수를 받는 호출 가능한 객체 (일반적으로 함수)

  - environ: 요청 정보를 담고 있는 딕셔너리
  - start_response: 응답 상태와 헤더를 설정하는 콜백 함수

```python
def simple_app(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/plain')]
    start_response(status, headers)
    return [b"Hello, World!"]
```

#### Flask와 WSGI

Flask는 WSGI 규격을 준수하는 웹 프레임워크입니다. Flask 애플리케이션 객체는 WSGI 애플리케이션으로 동작하며, WSGI 서버와 통신할 수 있습니다. 아래 예시는 Flask 애플리케이션이 WSGI 서버로부터 요청을 받아 처리하는 방법을 보여줍니다:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
```
이 코드에서 app.run()은 기본적으로 개발 서버를 실행하지만, 실제 배포 환경에서는 Gunicorn과 같은 WSGI 서버를 사용하여 Flask 애플리케이션을 실행합니다:

```sh
gunicorn app:app
```
여기서 app:app은 app.py 파일의 app 객체를 가리킵니다.

#### WSGI의 장점

- 호환성: 다양한 웹 서버와 Python 웹 애플리케이션 간의 호환성을 보장합니다.
- 유연성: 웹 서버와 애플리케이션을 독립적으로 개발 및 배포할 수 있습니다.
- 확장성: 여러 WSGI 미들웨어를 사용하여 애플리케이션에 기능을 추가할 수 있습니다 (예: 인증, 로깅, 캐싱).

#### WSGI 사용 시 주의점
- 동기적 동작: WSGI는 기본적으로 동기적으로 동작하므로, 비동기 처리를 위해서는 ASGI(Asynchronous Server Gateway Interface)와 같은 대안이 필요합니다.

- 배포: 개발 서버는 실제 배포에 적합하지 않으므로, Gunicorn, uWSGI와 같은 프로덕션용 WSGI 서버를 사용해야 합니다.


## 2. Flask 기본 구성 요소

- 애플리케이션 객체: Flask 클래스의 인스턴스로, 웹 애플리케이션을 나타냅니다.

```python
from flask import Flask
app = Flask(__name__)
```

- 라우팅: URL과 실행 함수를 매핑하여 웹 요청을 처리합니다.

```python
@app.route('/')
def hello_world():
    return 'Hello, World!'
```

- 템플릿: Jinja2 템플릿 엔진을 사용하여 동적 HTML을 생성합니다.

```python
from flask import render_template
@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name)
```

- 요청 객체: 클라이언트의 HTTP 요청 정보를 포함합니다.

```python
from flask import request
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    return f'Hello, {username}!'
```

- 응답 객체: 서버의 HTTP 응답을 생성합니다.

```python

from flask import Response
@app.route('/custom_response')
def custom_response():
    return Response('Custom Response', status=200, mimetype='text/plain')
```

## 3. Flask의 주요 기능

- 플래시 메시지: 사용자에게 일회성 메시지를 전달합니다.

```python
from flask import flash, redirect, url_for
@app.route('/flash')
def flash_message():
    flash('This is a flash message!')
    return redirect(url_for('index'))
```

- 세션: 클라이언트별 데이터를 저장합니다.

```python
from flask import session
@app.route('/set_session')
def set_session():
    session['key'] = 'value'
    return 'Session set!'
```

- 폼 처리: 웹 폼 데이터를 처리합니다.

```python
from flask import request
@app.route('/submit', methods=['POST'])
def submit():
    data = request.form['data']
    return f'You submitted: {data}'
```

- 리다이렉션: 요청을 다른 URL로 리다이렉트합니다.

```python
from flask import redirect, url_for
@app.route('/redirect_example')
def redirect_example():
    return redirect(url_for('hello', name='Redirected'))
```

## 4. Flask의 고급 기능
- Blueprints: 애플리케이션을 모듈 단위로 나누어 구조화합니다.

```python
from flask import Blueprint
bp = Blueprint('bp', __name__)

@bp.route('/bp_route')
def bp_route():
    return 'This is a blueprint route'

app.register_blueprint(bp)
```

- Flask-SQLAlchemy: ORM을 통해 데이터베이스와 상호작용합니다.

```python
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

db.create_all()
```

- Flask-Migrate: 데이터베이스 마이그레이션 도구

```python
from flask_migrate import Migrate
migrate = Migrate(app, db)
```

- Flask-SocketIO: 실시간 웹소켓 지원

```python
코드 복사
from flask_socketio import SocketIO
socketio = SocketIO(app)

@socketio.on('message')
def handle_message(message):
    print(f'received message: {message}')
```

- Flask-RESTful: REST API를 쉽게 구현

```python
from flask_restful import Api, Resource

api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, '/')
```

## 5. Flask 사용 시 주의점
- 보안: CSRF, XSS, SQL 인젝션 방지
  - CSRF 보호: Flask-WTF 사용
  - XSS 방지: 사용자 입력을 적절히 인코딩
  - SQL 인젝션 방지: ORM 사용 또는 파라미터화된 쿼리 작성

- 성능: 확장성 고려
  - 애플리케이션이 커지면 구조를 잘 설계해야 함
  - 필요 시 Gunicorn과 같은 WSGI 서버 사용

- 세션 관리: 중요한 정보는 서버에서 관리
  - 세션 데이터는 클라이언트 쪽에 저장되므로 민감한 데이터는 저장하지 않도록 주의

- 배포: 개발 환경과 배포 환경 구분
  - 개발용 서버는 프로덕션에 적합하지 않음
  - Nginx 또는 Apache와 함께 사용하여 배포

## 6. Flask 예시 프로젝트
블로그 애플리케이션: 사용자가 글을 작성하고, 읽고, 삭제할 수 있는 간단한 블로그 애플리케이션 예제

### 1. 프로젝트 구조:

```arduino
myblog/
├── app.py
├── config.py
├── models.py
├── templates/
│   ├── base.html
│   ├── index.html
│   └── post.html
├── static/
└── requirements.txt
```
### 2. app.py:

```python
from flask import Flask, render_template, request, redirect, url_for
from models import db, Post

app = Flask(__name__)
app.config.from_object('config')
db.init_app(app)

@app.route('/')
def index():
    posts = Post.query.all()
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', post=post)

@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = Post(title=title, content=content)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add.html')

if __name__ == '__main__':
    app.run(debug=True)
```

### 3.models.py:

```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    content = db.Column(db.Text, nullable=False)
```

### 4.config.py:

```python
import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = 'supersecretkey'
```
### 5. 템플릿 예제:

- base.html:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Blog</title>
</head>
<body>
    <h1>My Blog</h1>
    {% block content %}{% endblock %}
</body>
</html>
```
- index.html:

```html
{% extends "base.html" %}
{% block content %}
<a href="{{ url_for('add') }}">Add Post</a>
<ul>
    {% for post in posts %}
    <li>
        <a href="{{ url_for('post', post_id=post.id) }}">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>
{% endblock %}
```

- post.html:

```html
{% extends "base.html" %}
{% block content %}
<h2>{{ post.title }}</h2>
<p>{{ post.content }}</p>
<a href="{{ url_for('index') }}">Back</a>
{% endblock %}
```