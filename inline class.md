# Inline Caching
객체 필드에 접근을 할 때 hidden class를 사용한다면 결국 우리가 얻고 싶은 것은 접근하려는 필드의 오프셋 값입니다.

간단히 말하면 인라인 캐싱은 이 오프셋 값을 캐싱하겠다는 이야기입니다.

인라인 캐싱이야말로 자바스크립트 엔진의 최적화 철학이 가장 잘 드러나는 방법인데, 다음과 같은 두 가지 가정이 바탕에 깔려 있습니다.

동적인 언어라고 해봤자 실제로는 안바뀌는게 더 많다

성능을 빠르게 하려면 딴 거 다 필요없고 루프를 노려라

객체의 필드 구조가 런타임에 의해 변경될 수 있지만, 실제로는 자주 발생하지 않고, 더군다나 루프 안에서 변할 일은 거의 없을 것입니다.

이 가정이 맞다면 인라인 캐싱은 높은 효율을 보여줄 것이고, 실제로 벤치마크를 돌렸을 때 인라인 캐싱 적용 유무가 엄청나게 큰 차이를 보이게 됩니다.

inline_caching.png

위 그림은 JavaScriptCore bytecode중 하나인 put_by_id, 그러니까 객체의 필드에 값을 쓸 때 생성되는 네이티브 코드입니다.

자세히 보면 머리아프니까 (이미 hidden class에서 머리가 아팠겠지만...) 간단하게 보면,

처음 수행되었을 때에는 캐싱된 값이 없으므로, slow case (핸들러 함수, 비효율적)로 실행함. 이 때 찾은 오프셋 값과 히든 클래스(structure)를 constant pool 영역에 캐싱한다.
다음번에 같은 필드에 접근할 때 캐싱된 structure와 현재 객체가 가리키는 structure의 주소값을 비교한다.
만약 같다면 캐싱된 프로퍼티의 오프셋이 유효하다는 의미이므로, 아래쪽 코드 (파란색 영역)를 수행해서 바로 필드에 값을 저장한다.
만약 다르다면 필드 구조가 달라졌다는 의미이므로, 오프셋 값이 무효가 됨. 이 경우에는 slow case 로 넘어가서 다시 캐싱하거나 아예 캐싱을 포기하도록 변경한다.
실제로 적용되는 예제를 보면,

for (var i=0; i<10; i++) {
   arr[i].x = i;
}
위의 .x 부분에서 inline caching이 이루어지는 것입니다. 첫 번째 iteration(i=0)에서는 캐싱된 값이 없기 때문에 slow case로 실행이 되고, arr[0]의 structure와 arr[0].x의 오프셋 값이 캐싱됩니다. 그런 다음 두 번째부터 마지막까지는 캐싱된 오프셋 값을 바로 쓸 수 있기 때문에 클래스 기반 언어와 똑같은 성능을 보이게 됩니다.

단, arr[1]부터 arr[9]까지 모두 같은 필드 구조를 가지고 있어야만 성립되는 이야기입니다. 따라서 arr에 서로 다른 필드 구조를 가지는 객체가 이것저것 섞여서 들어있다던가, 아니면 저 코드가 arr에 든 오브젝트에 새로운 x 필드를 추가해 주기 위해 작성된 코드라던가 하는 경우에는 인라인 캐싱의 혜택을 전혀 못 받게 됩니다. (오히려 더 손해를 보게 됩니다)

한 가지 덧붙이자면, 간략한 설명을 위하여 첫 번째 수행에서 바로 캐싱을 한다고 말씀드렸지만, 정확하게는 두 번째 수행부터 캐싱을 합니다. 왜냐하면 한 번 수행된 코드는 한 번만 수행될 가능성이 높지만, 두 번 수행된 코드는 이후에 더 수행될 확률이 높기 때문입니다. (이것 역시 컴파일러 최적화 분야에서 자주 적용되는 기본 가정입니다.) 즉, 한 번만 수행되는 코드에 대해서는 캐싱을 해 봤자 의미가 없으므로 안 하는게 낫습니다.

# 결론
인라인 캐싱이 적용되려면 루프 안에서 필드 접근을 하려는 객체가 모두 같은 hidden class를 가리키고 있어야 합니다. 루프 안에서, 루프 중간에 객체의 필드 구조를 바꾸게 되면 좋지 않지만 실제로 이렇게 구현할 일은 거의 없을 것입니다. 그러므로 우리가 신경쓸 수 있는 부분은 위 예제 코드처럼 배열 내의 객체들을 반복해서 접근할 때, 하나의 배열 안에는 모두 같은 필드 구조를 가지는 (같은 hidden class를 가지는) 객체들만 넣어서 접근하도록 해 주는 정도가 될 것 입니다.

결국 지난 포스팅과 같은 결론에 도달했네요. 성능이 좋은 자바스크립트 프로그램을 만들고 싶다면, 자바스크립트를 정적인 언어라고 생각하고 쓰는 것이 좋습니다. 동적인 특성들을 최대한 활용하여 멋지고 파워풀한 코드를 작성할 수도 있지만, 거기엔 항상 성능이라는 대가가 따른다는 것을 명심해야 합니다.