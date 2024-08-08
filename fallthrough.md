# Fallthrough

Vue 3에서 도입된 Fallthrough 메커니즘은 부모 컴포넌트에서 자식 컴포넌트로 전달되지 않은 속성들을 자동으로 자식 컴포넌트의 루트 엘리먼트로 전달해주는 기능입니다.
이 기능은 Vue 2에서 사용되던 .attrs 객체와 유사하지만, Vue 3에서 더 직관적이고 사용하기 쉽게 개선되었습니다.

## 기본 개념

Fallthrough 메커니즘을 통해, 부모 컴포넌트가 자식 컴포넌트를 호출하면서 특정 속성을 전달했을 때, 자식 컴포넌트에서 이 속성들을 명시적으로 props로 정의하지 않아도 루트 엘리먼트로 자동으로 전달됩니다.

## 예제
### 부모 컴포넌트 (ParentComponent.vue)
```vue
<template>
  <ChildComponent id="parent-id" class="parent-class" />
</template>
```

### 자식 컴포넌트 (ChildComponent.vue)
```vue
<template>
  <div>
    Child Component Content
  </div>
</template>

<script>
export default {
  name: 'ChildComponent'
}
</script>
```
위 예제에서 ChildComponent는 id와 class 속성을 명시적으로 받지 않았습니다. 그러나 Vue 3의 Fallthrough 메커니즘에 의해, 이 속성들은 ChildComponent의 루트 엘리먼트인 < div >에 자동으로 전달됩니다. 결과적으로 렌더링된 HTML은 다음과 같습니다:

```html
<div id="parent-id" class="parent-class">
  Child Component Content
</div>
```

## Fallthrough 메커니즘 비활성화
Fallthrough 기능을 비활성화하고 싶다면, 자식 컴포넌트에서 inheritAttrs: false를 설정할 수 있습니다. 이는 자식 컴포넌트가 부모 컴포넌트로부터 전달된 속성들을 자동으로 받지 않도록 설정합니다.

### 예제 (ChildComponent.vue)
```vue
<template>
  <div>
    <!-- 필요시 이곳에서 수동으로 속성들을 처리할 수 있습니다 -->
    {{ $attrs }}
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  inheritAttrs: false
}
</script>
```
이 설정을 하면 부모 컴포넌트에서 전달된 속성들은 더 이상 자식 컴포넌트의 루트 엘리먼트로 전달되지 않으며, 자식 컴포넌트에서 $attrs 객체를 통해 직접 접근하여 처리할 수 있습니다.

## Vue 2와의 비교
Vue 2에서는 속성 전달을 위해 .attrs 객체를 사용했습니다. Vue 3에서는 이 기능이 기본적으로 제공되며, 더 직관적이고 사용하기 쉽게 개선되었습니다. Vue 2와의 주요 차이점은 다음과 같습니다:

- Vue 2: .attrs 객체를 명시적으로 사용해야 했습니다.
- Vue 3: Fallthrough 메커니즘이 기본으로 적용되어 자식 컴포넌트가 부모 컴포넌트에서 전달된 속성들을 자동으로 처리합니다.

### Vue 2 예제
```vue
<template>
  <child-component v-bind="$attrs" />
</template>

<script>
export default {
  inheritAttrs: false,
  // Vue 2에서는 속성 전달을 수동으로 처리
}
</script>
```
## 실전 예제

Fallthrough 메커니즘을 실전에서 어떻게 활용할 수 있는지 알아보겠습니다.

### 부모 컴포넌트 (ParentComponent.vue)
```vue
<template>
  <ChildComponent id="custom-id" class="custom-class" data-test="example" />
</template>
```

### 자식 컴포넌트 (ChildComponent.vue)
```vue
<template>
  <div>
    Hello World
  </div>
</template>

<script>
export default {
  name: 'ChildComponent'
}
</script>
```
이 예제에서는 부모 컴포넌트에서 id, class, data-test 속성을 전달했지만, 자식 컴포넌트에서 이를 명시적으로 받지 않았습니다. Vue 3의 Fallthrough 메커니즘에 의해, 이러한 속성들은 자식 컴포넌트의 루트 엘리먼트로 자동으로 전달됩니다. 결과는 다음과 같습니다:

```html
<div id="custom-id" class="custom-class" data-test="example">
  Hello World
</div>
```
## 결론
Vue 3의 Fallthrough 메커니즘은 컴포넌트 간 속성 전달을 더 간편하고 직관적으로 만들어줍니다. 이를 통해 부모 컴포넌트에서 전달된 속성들이 자식 컴포넌트의 루트 엘리먼트에 자동으로 적용되어, 컴포넌트 작성 시의 편의성과 유연성을 높일 수 있습니다. Vue 2와 비교했을 때, 이러한 변화는 속성 전달의 복잡성을 줄이고 코드의 가독성을 높이는 데 큰 도움이 됩니다.

## fallthrough를 이용한 컴포넌트 테스트?

### vue에서 emit
https://ko.vuejs.org/guide/components/events

> 네이티브 DOM 이벤트와 달리, 컴포넌트에서 발생한 이벤트는 버블링되지 않습니다. 직접 자식 컴포넌트에서 발생한 이벤트만 수신할 수 있습니다. 형제 컴포넌트나 깊숙이 중첩된 컴포넌트 간에 통신이 필요한 경우, 외부 이벤트 버스 또는 글로벌 상태 관리 솔루션을 사용하세요.

### 컴포넌트 구조
1. 조상 컴포넌트 (AncestorComponent.vue):

- GrandparentComponent에 message prop을 전달하고, update 이벤트를 리슨합니다.
- update 이벤트가 발생하면 handleUpdate 메서드를 통해 이벤트를 처리합니다.

2. 부모의 부모 컴포넌트 (GrandparentComponent.vue):

- ParentComponent에 message prop을 전달하고, update 이벤트를 리슨합니다.
- update 이벤트가 발생하면 이를 forwardUpdate 메서드를 통해 조상 컴포넌트로 전달합니다.

3. 부모 컴포넌트 (ParentComponent.vue):

- ChildComponent에 message prop을 전달하고, update 이벤트를 리슨합니다.
- update 이벤트가 발생하면 이를 forwardUpdate 메서드를 통해 부모의 부모 컴포넌트로 전달합니다.

4. 자식 컴포넌트 (ChildComponent.vue):

- message prop을 받아서 표시합니다.
- 버튼 클릭 시 update 이벤트를 발생시켜 부모 컴포넌트로 전달합니다.

#### 조상 컴포넌트 (AncestorComponent.vue)
조상 컴포넌트는 최상위 컴포넌트로, props를 전달하고 이벤트를 리슨합니다.

```vue
<template>
  <GrandparentComponent message="Hello from Ancestor" @update="handleUpdate" />
</template>

<script>
import GrandparentComponent from './GrandparentComponent.vue';

export default {
  name: 'AncestorComponent',
  components: {
    GrandparentComponent
  },
  methods: {
    handleUpdate(payload) {
      console.log('Update event received in AncestorComponent:', payload);
    }
  }
}
</script>
```
#### 부모의 부모 컴포넌트 (GrandparentComponent.vue)
부모의 부모 컴포넌트는 props를 받아서 자식 컴포넌트로 전달하고, 이벤트를 리슨하여 부모 컴포넌트로 전달합니다.

```vue
<template>
  <ParentComponent :message="message" @update="forwardUpdate" />
</template>

<script>
import ParentComponent from './ParentComponent.vue';

export default {
  name: 'GrandparentComponent',
  components: {
    ParentComponent
  },
  props: {
    message: String
  },
  methods: {
    forwardUpdate(payload) {
      this.$emit('update', payload);
    }
  }
}
</script>
```

#### 부모 컴포넌트 (ParentComponent.vue)
부모 컴포넌트는 props를 받아서 자식 컴포넌트로 전달하고, 이벤트를 리슨하여 조상 컴포넌트로 전달합니다.

```vue
<template>
  <ChildComponent :message="message" @update="forwardUpdate" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  name: 'ParentComponent',
  components: {
    ChildComponent
  },
  props: {
    message: String
  },
  methods: {
    forwardUpdate(payload) {
      this.$emit('update', payload);
    }
  }
}
</script>
```

#### 자식 컴포넌트 (ChildComponent.vue)
자식 컴포넌트는 props를 받아서 표시하고, 이벤트를 발생시켜 부모 컴포넌트로 전달합니다.

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendUpdate">Send Update</button>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    message: String
  },
  methods: {
    sendUpdate() {
      this.$emit('update', 'Updated from ChildComponent');
    }
  }
}
</script>
```

### 데이터 및 이벤트 흐름
조상 컴포넌트는 메시지를 부모의 부모 컴포넌트로 전달하고, 부모의 부모 컴포넌트는 이를 부모 컴포넌트로 전달하며, 최종적으로 자식 컴포넌트로 전달합니다.

자식 컴포넌트에서 발생한 update 이벤트는 부모 컴포넌트를 거쳐 부모의 부모 컴포넌트로, 그리고 최종적으로 조상 컴포넌트로 전달됩니다.

## bug?
https://github.com/vuejs/core/discussions/8350

## fallthrough 공식 사이트

https://ko.vuejs.org/guide/components/attrs
