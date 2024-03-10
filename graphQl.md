# GraphQL이란?
GraphQL은 페이스북에서 개발한 쿼리 언어로, 클라이언트가 서버로부터 정확히 필요한 데이터를 요청할 수 있는 기술입니다. REST API와 달리 클라이언트가 필요로 하는 데이터의 구조를 정확하게 정의하여 요청할 수 있으며, 서버는 해당 요청에 대해 정확히 그 구조에 맞는 데이터를 응답합니다.

## GraphQL의 구조
GraphQL 쿼리는 타입 시스템을 기반으로 구성됩니다. 각 필드는 해당 필드의 타입을 반환하며, 필드는 중첩될 수 있어 복잡한 데이터 구조를 쉽게 표현할 수 있습니다. 이러한 구조는 클라이언트가 필요로 하는 데이터를 정확하게 요청할 수 있도록 도와줍니다.

## REST API와의 차이점
 - 단일 요청: REST API에서는 여러 엔드포인트를 통해 데이터를 요청해야하는 반면, GraphQL은 단일 엔드포인트를 통해 모든 데이터 요청을 처리합니다.
 - 정확한 데이터 요청: GraphQL에서는 클라이언트가 필요로 하는 정확한 데이터를 요청할 수 있습니다. 이는 Over-fetching과 Under-fetching을 방지합니다.
 - 유연성: GraphQL은 클라이언트에게 데이터를 요청하는 유연성을 제공합니다. 필요한 데이터를 정확히 요청할 수 있으며, 클라이언트의 요구에 따라 데이터를 쉽게 조정할 수 있습니다.
 - 타입 시스템: GraphQL은 타입 시스템을 사용하여 데이터의 구조를 명확하게 정의합니다. 이는 클라이언트와 서버 간의 커뮤니케이션을 향상시키고 실수를 방지하는 데 도움이 됩니다.

## 예시
아래는 GraphQL 쿼리와 해당 응답의 예시입니다.

### 쿼리:

```
{
  user(id: 123) {
    name
    email
    posts {
      title
      content
    }
  }
}
```
### 응답:
```
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        {
          "title": "GraphQL Introduction",
          "content": "This is an introduction to GraphQL."
        },
        {
          "title": "GraphQL Best Practices",
          "content": "These are some best practices for using GraphQL."
        }
      ]
    }
  }
}
```
위의 예시에서 볼 수 있듯이, 클라이언트는 필요한 데이터를 정확하게 요청하고, 서버는 해당 요청에 정확하게 맞는 데이터를 응답합니다.

이처럼 GraphQL은 클라이언트와 서버 간의 효율적인 데이터 교환을 가능하게 하며, 유연성과 정확성을 제공하여 개발자들에게 많은 혜택을 제공합니다.

# BE 설정

## GraphQL 스키마(Schema):
GraphQL 스키마는 클라이언트가 요청할 수 있는 데이터의 구조와 형태를 정의합니다. 이는 타입 시스템을 사용하여 서버가 클라이언트에 제공할 수 있는 데이터의 종류(Type), 이들 간의 관계, 그리고 클라이언트가 데이터에 접근할 수 있는 방법(Query, Mutation)을 명시합니다.

### 스키마의 중요성:

- 타입 시스템: 스키마는 GraphQL 타입 시스템을 사용하여 API에서 사용할 수 있는 객체, 스칼라, 인터페이스 등의 타입을 정의합니다. 이를 통해 데이터의 정확성, 포맷 및 구조를 보장합니다.

- 문서화: 스키마는 자동으로 API 문서화를 제공합니다. 클라이언트 개발자는 스키마를 통해 사용 가능한 데이터 타입, 쿼리, 뮤테이션을 이해하고 API와 상호 작용할 수 있습니다.

- 검증: 서버는 클라이언트 요청을 스키마에 따라 검증합니다. 이는 클라이언트가 유효하지 않은 쿼리를 보내는 것을 방지하고, 데이터 일관성을 유지합니다.

```
type User {
  id: ID!
  name: String
  email: String
}

type Query {
  user(id: ID!): User
  users: [User]
}

type Mutation {
  createUser(name: String!, email: String!): User
}
```

## GraphQL 리졸버(Resolver):
리졸버는 GraphQL 쿼리 또는 뮤테이션의 구체적인 실행 로직을 정의하는 함수입니다. 클라이언트가 쿼리나 뮤테이션을 요청하면, 해당 요청을 처리하기 위해 특정 리졸버가 호출됩니다.

### 리졸버의 역할:
- 데이터 패칭: 리졸버 함수는 데이터베이스나 다른 API로부터 필요한 데이터를 가져오는 로직을 구현합니다. 이는 SQL 쿼리 실행, REST API 호출, 정적 파일 읽기 등 다양한 형태를 취할 수 있습니다.

- 데이터 변형: 리졸버는 가져온 데이터를 클라이언트가 요청한 형태로 변형하거나 조합할 수 있습니다.

- 오류 처리: 리졸버는 데이터 패칭이나 변형 과정에서 발생하는 오류를 처리하고, 적절한 오류 메시지를 클라이언트에게 반환할 수 있습니다.

- 권한 검증: 리졸버는 사용자 인증 및 권한 검증 로직을 포함하여, 요청한 사용자가 해당 데이터에 접근할 수 있는지 확인할 수 있습니다.

예시:
```
const resolvers = {
  Query: {
    user: (parent, { id }, context, info) => {
      // 데이터베이스에서 ID에 해당하는 사용자 데이터를 찾아 반환
      return findUserById(id);
    },
    users: () => {
      // 데이터베이스에서 모든 사용자 데이터를 조회하여 반환
      return findAllUsers();
    }
  },
  Mutation: {
    createUser: (parent, { name, email }) => {
      // 새 사용자를 생성하고 데이터베이스에 저장 후 반환
      return createUser({ name, email });
    }
  }
};
```
GraphQL에서는 주로 쿼리(Query)와 뮤테이션(Mutation)을 사용하여 데이터를 요청하고 변경합니다. 이들은 GraphQL의 주요 기능이며, 각각 데이터를 읽는 데 사용되는 쿼리와 데이터를 변경하는 데 사용되는 뮤테이션에 대해 자세히 설명하겠습니다.

#### 쿼리(Query)

쿼리는 GraphQL에서 데이터를 읽는 데 사용됩니다. 클라이언트는 서버로 쿼리를 보내고, 서버는 해당 쿼리에 따라 데이터를 반환합니다. GraphQL은 클라이언트가 필요한 정확한 데이터를 요청할 수 있도록 지원합니다.

특징:
- 읽기 전용(Operation): 쿼리는 데이터를 읽기만 하며 변경하지 않습니다.
- 필드 기반(Operation): 클라이언트는 요청하는 데이터의 필드를 정확하게 지정할 수 있습니다.
- 중첩된 데이터(Operation): 필요한 경우 쿼리는 중첩된 구조로 데이터를 요청할 수 있습니다.
- 단일 엔드포인트(Operation): 하나의 엔드포인트를 통해 여러 데이터를 요청할 수 있습니다.
```
query {
  user(id: "123") {
    id
    name
    email
    posts {
      id
      title
      content
    }
  }
}
```
위 쿼리는 user의 id, name, email 및 해당 사용자가 작성한 posts의 id, title, content를 요청합니다.

#### 뮤테이션(Mutation)

뮤테이션은 GraphQL에서 데이터를 변경하는 데 사용됩니다. 쿼리와 달리 뮤테이션은 서버 상태를 변경하고 새로운 데이터를 생성하거나 수정합니다.

특징:

- 쓰기 작업(Operation): 뮤테이션은 데이터를 변경하거나 새로운 데이터를 생성합니다.
- 필드 기반(Operation): 쿼리와 마찬가지로 클라이언트는 변경할 데이터의 필드를 정확하게 지정할 수 있습니다.
- 변경 사항 응답(Operation): 서버는 보통 뮤테이션 수행 후 변경된 데이터나 작업 성공 여부를 응답합니다.
```
mutation {
  createUser(name: "John", email: "john@example.com") {
    id
    name
    email
  }
}
위 뮤테이션은 새로운 사용자를 생성하며, 생성된 사용자의 id, name, email을 반환합니다.
```


쿼리는 주로 데이터를 읽는 데 사용되며, 뮤테이션은 데이터를 변경하는 데 사용됩니다. GraphQL은 이러한 쿼리와 뮤테이션을 통해 클라이언트가 필요한 정확한 데이터를 요청하고 서버 상태를 변경할 수 있도록 지원합니다. 클라이언트는 필요한 데이터와 작업을 정확하게 지정하여 요청하므로 데이터의 과부하를 방지하고 성능을 최적화할 수 있습니다.

## Local BE 설정
Node.js 백엔드에서 GraphQL 서버를 구성하고 MongoDB를 데이터베이스로 사용하는 방법을 상세하게 설명하겠습니다. 이 예시에서는 Apollo Server, Mongoose 및 GraphQL을 사용합니다.

## 필요한 모듈 설치:
먼저, 필요한 모듈들을 설치합니다. apollo-server, graphql, 그리고 mongoose를 포함합니다.

```
npm install apollo-server graphql mongoose
```
## MongoDB 모델 설정:
models/User.js 파일을 생성하여 Mongoose 모델을 설정합니다. 예를 들어, 사용자 모델을 생성할 수 있습니다.

```
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

module.exports = mongoose.model('User', userSchema);
```

### Mongoose 모델

Mongoose 모델은 MongoDB 컬렉션의 구조를 정의하고 해당 데이터를 읽고 쓰는 데 사용됩니다. 각각의 모델은 Mongoose 스키마를 기반으로 생성됩니다. 모델을 생성하기 위해 mongoose.model() 메서드를 사용합니다. 이 메서드는 모델의 이름과 해당 모델에 대한 스키마를 인수로 받습니다.

```
const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// 사용자 모델 생성
const User = mongoose.model('User', userSchema);
```
위 예제에서는 User 모델을 생성하고, 해당 모델은 name, age, email 필드를 가지는 사용자 스키마에 기반합니다.

#### Mongoose 모델 옵션

##### collection
- 모델이 연결될 MongoDB 컬렉션의 이름을 정의합니다.
- 기본값: 모델의 이름을 소문자로 만들고 그 뒤에 복수형으로 변환한 문자열입니다.
```
const userSchema = new mongoose.Schema({
  // 필드들...
}, { collection: 'users' });
```

##### timestamps
- 모델이 생성된 시간과 수정된 시간을 자동으로 기록할지 여부를 정의합니다.
- 기본값: false입니다. 즉, 생성된 시간과 수정된 시간을 자동으로 기록하지 않습니다.

```
const userSchema = new mongoose.Schema({
  // 필드들...
}, { timestamps: true });
```

##### strict
- 스키마 외에 다른 필드를 허용할지 여부를 정의합니다.
- 기본값: true입니다. 즉, 스키마 외에 추가적인 필드를 허용하지 않습니다.
```
const userSchema = new mongoose.Schema({
  // 필드들...
}, { strict: false });
```

##### versionKey
- 버전 키의 이름을 정의합니다.
- 기본값: __v입니다.
```
const userSchema = new mongoose.Schema({
  // 필드들...
}, { versionKey: '_myVersionKey' });
```

##### toJSON 및 toObject
- 객체를 JSON 형식으로 변환할 때 설정할 옵션을 정의합니다.
- 기본값: {}입니다. 즉, 기본적으로 가상속성(virtuals)은 JSON 객체로 변환되지 않습니다.
```
const userSchema = new mongoose.Schema({
  // 필드들...
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
```

#### Mongoose 메서드

##### find()

find() 메서드는 조건에 맞는 여러 개의 문서를 검색합니다.

사용법:
```
Model.find(조건, 콜백);
```

예제:
```
const users = await User.find({ age: { $gt: 18 } });
```
위 예제는 나이가 18보다 큰 모든 사용자를 검색합니다.

> 주요 비교 연산자
> - $gt (greater than)
> 의미: 필드의 값이 지정된 값보다 큰 문서를 검색합니다.
> 예제: age: { $gt: 18 }는 나이가 18보다 큰 모든 문서를 검색합니다.
> - $lt (less than)
> 의미: 필드의 값이 지정된 값보다 작은 문서를 검색합니다.
> 예제: age: { $lt: 30 }는 나이가 30보다 작은 모든 문서를 검색합니다.
> - $gte (greater than or equal to)
> 의미: 필드의 값이 지정된 값보다 크거나 같은 문서를 검색합니다.
> 예제: age: { $gte: 18 }는 나이가 18보다 크거나 같은 모든 문서를 검색합니다.
> - $lte (less than or equal to)
> 의미: 필드의 값이 지정된 값보다 작거나 같은 문서를 검색합니다.
> 예제: age: { $lte: 30 }는 나이가 30보다 작거나 같은 모든 문서를 검색합니다.
> - $eq (equal)
> 의미: 필드의 값이 지정된 값과 동일한 문서를 검색합니다.
> 예제: status: { $eq: 'active' }는 상태가 'active'인 모든 문서를 검색합니다.
> - $ne (not equal)
> 의미: 필드의 값이 지정된 값과 다른 문서를 검색합니다.
> 예제: status: { $ne: 'deleted' }는 상태가 'deleted'가 아닌 모든 문서를 검색합니다.

##### findById()

findById() 메서드는 주어진 ID에 해당하는 문서를 검색합니다.

사용법:
```
Model.findById(ID, 콜백);
```

예제:
```
const user = await User.findById('60d4a53c46edfb53608366e0');
```
위 예제는 주어진 ID에 해당하는 사용자를 검색합니다.

##### findOne()

findOne() 메서드는 조건에 맞는 단일 문서를 검색합니다.

사용법:
```
Model.findOne(조건, 콜백);
```

예제:
```
const user = await User.findOne({ email: 'test@example.com' });
```
위 예제는 이메일이 'test@example.com'인 사용자를 검색합니다.

##### save()

save() 메서드는 새로운 문서를 생성하거나 기존 문서를 수정하여 저장합니다.

사용법:
```
const document = new Model(데이터);
document.save();
```
예제:
```
const newUser = new User({ name: 'John', age: 25, email: 'john@example.com' });
await newUser.save();
```
위 예제는 새로운 사용자를 생성하고 저장합니다.

##### remove() / deleteOne() / deleteMany()

remove(), deleteOne(), deleteMany() 메서드는 문서를 삭제합니다.

사용법:
```
Model.remove(조건, 콜백); // 모든 문서를 삭제합니다.
Model.deleteOne(조건, 콜백); // 조건에 맞는 단일 문서를 삭제합니다.
Model.deleteMany(조건, 콜백); // 조건에 맞는 모든 문서를 삭제합니다.
```

예제:
```
// 모든 사용자를 삭제합니다.
await User.remove({});

// 이메일이 'test@example.com'인 사용자를 삭제합니다.
await User.deleteOne({ email: 'test@example.com' });

// 나이가 18보다 큰 모든 사용자를 삭제합니다.
await User.deleteMany({ age: { $gt: 18 } });
```
위와 같이 몽구스에서 제공하는 주요 메서드들을 사용하여 데이터를 검색하고 생성하고 수정하고 삭제할 수 있습니다. 각 메서드는 조건에 따라 다양한 기능을 수행하며, 콜백을 통해 비동기적으로 처리할 수 있습니다.

## GraphQL 스키마 및 리졸버 정의:
schema.js 파일을 생성하여 GraphQL 스키마와 리졸버를 정의합니다.

```
const { gql } = require('apollo-server');
const User = require('./models/User');

// GraphQL 스키마 정의
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    age: Int
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String, age: Int, email: String): User
  }
`;

// 리졸버 정의
const resolvers = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id)
  },
  Mutation: {
    createUser: (_, { name, age, email }) => {
      const newUser = new User({ name, age, email });
      return newUser.save();
    }
  }
};

module.exports = { typeDefs, resolvers };
```


## Apollo Server 설정 및 실행:
index.js 파일을 생성하여 Apollo Server를 설정하고 실행합니다.

```
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./schema');

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Apollo Server 인스턴스 생성
const server = new ApolloServer({ typeDefs, resolvers });

// 서버 시작
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

```
이 설정을 완료하면, Node.js 환경에서 GraphQL 서버가 실행되며 MongoDB를 데이터베이스로 사용하게 됩니다. apollo-server를 사용하면 GraphQL 스키마와 리졸버를 쉽게 설정하고 관리할 수 있습니다. 또한, mongoose를 통해 MongoDB 데이터베이스와의 상호 작용을 쉽게 처리할 수 있습니다.

위 예시에서는 사용자 데이터를 생성, 조회하는 기본적인 GraphQL 쿼리와 뮤테이션을 구현했습니다. 실제 애플리케이션에서는 더 복잡한 스키마와 리졸버를 구현할 수 있습니다.

## GraphQL 서버

### Apollo Server
#### 장점:
- 유연성: Apollo Server는 다양한 데이터 소스와 함께 사용할 수 있습니다. REST API, 데이터베이스, 외부 서비스 등과 통합이 용이합니다.

- 강력한 기능: Apollo Server는 데이터 가져오기(Data Fetching), 데이터 변경(Mutation), 실시간 업데이트(Subscriptions), 캐싱(Caching) 등을 지원하는 강력한 기능을 제공합니다.

- 커뮤니티 및 생태계: Apollo는 활발한 커뮤니티와 다양한 생태계를 가지고 있어서 문제 해결이나 새로운 기능에 대한 지원을 받을 수 있습니다.

#### 단점:
- 학습 곡선: Apollo Server는 GraphQL의 모든 기능을 다루므로 처음 접하는 사용자에게는 학습 곡선이 조금 가팔라질 수 있습니다.

- 복잡성: 강력한 기능은 종종 복잡성과 관련이 있을 수 있습니다. 복잡한 구성 및 설정이 필요할 수 있습니다.

예제:
아래는 Apollo Server를 사용하여 간단한 GraphQL 서버를 구축하는 예제입니다.

```
const { ApolloServer, gql } = require('apollo-server');

// 스키마 정의
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 리졸버 정의
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

// Apollo Server 인스턴스 생성
const server = new ApolloServer({ typeDefs, resolvers });

// 서버 시작
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```
위 예제에서는 typeDefs에 GraphQL 스키마를 정의하고, resolvers에 해당 스키마에 대한 리졸버 함수를 정의합니다. 그리고 이를 사용하여 Apollo Server 인스턴스를 생성하고 서버를 시작합니다.

이렇게 간단하게 Apollo Server를 사용하여 GraphQL 서버를 구축할 수 있습니다. 장점은 강력한 기능과 커뮤니티 지원으로 인해 프로덕션 환경에서도 안정적으로 사용할 수 있다는 것입니다.

### express-graphql
#### 장점:
- 간단한 설정: express-graphql은 Express.js와 함께 사용하기 쉽고 간단한 설정을 제공합니다.
- 빠른 개발: 빠른 프로토타이핑 및 개발에 유용합니다.
- GraphQL 스키마에 대한 자동 탐지: GraphQL 스키마를 사용하여 자동으로 요청을 처리합니다.

#### 단점:
- 고급 기능의 부족: Apollo에 비해 고급 기능 및 개발 도구가 제한적일 수 있습니다.
- 확장성 문제: 대규모 애플리케이션에서는 확장성 문제가 발생할 수 있습니다.

예제:
```
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello World!'
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
```
### koa-graphql
#### 장점:
- Koa.js와의 통합: Koa 프레임워크와 함께 사용할 수 있으며, Koa의 특징을 모두 활용할 수 있습니다.
- 간결하고 가벼운 구현: 간결하고 가벼운 구현을 통해 빠른 개발을 할 수 있습니다.
#### 단점:
- 고급 기능의 부족: Apollo에 비해 고급 기능 및 개발 도구가 제한적일 수 있습니다.
- 커뮤니티 지원 부족: Apollo에 비해 커뮤니티 및 생태계가 작을 수 있습니다.

### fastify-gql
#### 장점:
- 성능: Fastify는 성능이 우수하고 가벼운 웹 프레임워크로 알려져 있습니다.
- Fastify와의 통합: Fastify의 모든 기능과 함께 사용할 수 있습니다.

#### 단점:
- 커뮤니티 지원 부족: Apollo에 비해 커뮤니티 및 생태계가 작을 수 있습니다.
- 고급 기능의 부족: Apollo에 비해 고급 기능 및 개발 도구가 제한적일 수 있습니다.

### koa And fastify

#### Koa.js

Koa.js는 Node.js 웹 프레임워크로, Express의 창시자들이 만든 미들웨어 프레임워크입니다. Koa는 Express와 유사하지만 미들웨어 처리 방식과 구조가 다릅니다. Koa는 ES6의 async/await 기능을 활용하여 비동기 코드를 더 간결하게 작성할 수 있습니다.

주요 특징:

- 미들웨어 중심: Koa는 미들웨어 스택을 사용하여 요청을 처리하며, 각 미들웨어는 다음 미들웨어를 호출하거나 요청을 종료할 수 있습니다.

- Async/Await 지원: Koa는 비동기 코드를 작성하기 위해 ES6의 async/await를 기본적으로 사용합니다. 이를 통해 코드를 더 간결하게 작성할 수 있습니다.

- 클라이언트 및 서버 모두에 사용: 주로 서버 측 개발에 사용되지만, Koa를 사용하여 클라이언트 측 또는 서버리스 애플리케이션도 개발할 수 있습니다.

#### Fastify
Fastify는 Node.js의 빠른 웹 프레임워크로, Express의 경량화된 버전으로 간주될 수 있습니다. Fastify는 성능, 안정성 및 생산성에 중점을 두고 설계되었으며, 플러그인 아키텍처를 사용하여 간단하게 확장할 수 있습니다.

주요 특징:

- 빠른 속도: Fastify는 Node.js에서 가장 빠른 웹 프레임워크 중 하나로 알려져 있습니다. 매우 빠른 라우팅 및 요청 처리 속도를 제공합니다.

- 스키마 기반의 유효성 검사: Fastify는 요청과 응답의 구조를 사전에 정의하고 검사하는 기능을 제공합니다. 이는 런타임 오류를 방지하고 보다 안정적인 애플리케이션을 만들 수 있도록 도와줍니다.

- 생태계의 성장: Fastify는 지속적으로 성장하는 커뮤니티와 생태계를 가지고 있으며, 다양한 플러그인과 도구가 개발되고 있습니다.

#### express VS koa VS fastify
https://codingcoding.tistory.com/1318

# FE 설정

## Apollo Client 설정
ApolloClient 인스턴스를 생성하고, React 앱과 연결 합니다. index.js 또는 App.js 파일에서 다음과 같이 설정할 수 있습니다.

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_API_ENDPOINT', // 여기에 GraphQL 서버의 엔드포인트를 입력하세요.
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```
## GraphQL 쿼리 작성
컴포넌트 내에서 사용할 GraphQL 쿼리를 작성합니다. 예를 들어, 다음과 같이 쿼리를 정의할 수 있습니다.

```
import { gql } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;
```
## 쿼리 사용하기

useQuery 훅을 사용하여 컴포넌트에서 GraphQL 쿼리를 실행합니다. 다음은 Dogs 컴포넌트에서 쿼리를 사용하는 방법의 예시입니다.

```
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function Dogs() {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.dogs.map(({ id, breed }) => (
        <li key={id}>{breed}</li>
      ))}
    </ul>
  );
}
```
## 앱 실행
모든 설정이 완료되었다면, React 앱을 실행하고 웹 브라우저에서 결과를 확인할 수 있습니다. 터미널에서 다음 명령어를 실행하세요:
```
npm start
```

## graqhQL 라이브러리 
GraphQL을 프론트엔드에서 사용하기 위해 몇 가지 인기 있는 라이브러리가 있어요. 주요한 것들로는 Apollo Client, Relay, urql 그리고 GraphQL Request가 있습니다. 각각의 라이브러리에 대해 알아보고 장단점을 살펴보겠습니다.

### Apollo Client

장점:

- 강력한 캐싱 기능을 제공하여 애플리케이션의 성능을 향상시킵니다.
- 넓은 생태계와 커뮤니티 지원을 받고 있어 많은 리소스와 툴을 사용할 수 있습니다.
- React, Angular, Vue 등 다양한 프론트엔드 프레임워크와 호환됩니다.

단점:

- 비교적 무거워 초기 로딩 시간이 길어질 수 있습니다.
- 학습 곡선이 높은 편입니다.

예시 코드

```
import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map(dog => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}
```
### Relay

장점:
- Facebook에 의해 개발되었으며, 대규모 애플리케이션을 위한 최적화가 이루어져 있습니다.
- 컴포넌트 단위의 데이터 요구 사항을 정의할 수 있어, 효율적인 데이터 요청이 가능합니다.
- 자동으로 데이터 종속성을 관리합니다.

단점:
- 초기 설정이 복잡하고 학습 곡선이 매우 높습니다.
- Apollo Client에 비해 커뮤니티 지원이 적은 편입니다.

예시 코드
```
import React from 'react';
import { graphql, useFragment } from 'react-relay/hooks';

const dogFragment = graphql`
  fragment DogItem_dog on Dog {
    id
    breed
  }
`;

function DogItem(props) {
  const dog = useFragment(dogFragment, props.dog);

  return <div>{dog.breed}</div>;
}
```
### urql

장점:

- 간단하고 직관적인 API를 제공합니다.
- 작은 번들 크기로 빠른 로딩 시간을 가집니다.
- React와 같은 프레임워크에 특화되어 있지 않아 범용성이 좋습니다.

단점:

- Apollo Client만큼 강력한 캐싱 기능을 제공하지 않습니다.
- 커뮤니티 지원이 상대적으로 작습니다.

예시 코드
```
import React from 'react';
import { useQuery, gql } from 'urql';

const DogsQuery = gql`
  query {
    dogs {
      id
      breed
    }
  }
`;

function Dogs() {
  const [{ data, fetching, error }] = useQuery({ query: DogsQuery });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.dogs.map(dog => (
        <div key={dog.id}>{dog.breed}</div>
      ))}
    </div>
  );
}
```
### GraphQL Request

장점:

- 가장 간단하고 가벼운 GraphQL 클라이언트입니다.
- 간단한 GraphQL 요청에 적합합니다.

단점:

- 캐싱이나 오류 처리와 같은 고급 기능이 부족합니다.
- 대규모 애플리케이션에는 적합하지 않을 수 있습니다.

예시 코드:

```
import { request, gql } from 'graphql-request';

const query = gql`
  {
    allUsers {
      id
      name
    }
  }
`;

request('http://api.graphql.com', query).then((data) => console.log(data))
```

각 라이브러리마다 장단점이 있으니, 프로젝트의 필요와 개발 환경에 맞는 것을 선택하는 것이 중요합니다.

https://hasura.io/blog/exploring-graphql-clients-apollo-client-vs-relay-vs-urql