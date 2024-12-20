const EventEmitter = require("events");

const subject = new EventEmitter();
// subject (observer design pattern의 관찰 대상 역할할)

subject.on("updatePost", () => {
  console.log("This post is so awesome!");
});
// observer 1: updatePost 이벤트 발생 시 실행될 콜백 등록
// on 메서드는 특정 이벤트가 발생할 때 실행될 리스너를 추가합니다.

subject.on("updatePost", () => {
  console.log("I like this post!");
});
// observer 2: 동일 이벤트에 추가적인 리스너 등록

subject.on("createPost", (type) => {
  console.log(`I like this ${type} post!`);
});
// observer 3: 동일 이벤트에 추가적인 리스너 등록록

subject.emit("updatePost");
// emit 메서드는 updatePost 이벤트를 트리거하여, 등록된 모든 리스너를 실행합니다.

subject.emit("createPost", "image");
// emit 메서드에 추가 인수를 전달할 수 있습니다.
