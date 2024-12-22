const EventEmitter = require("events");

const subject = new EventEmitter();
// subject: Observer Design Pattern에서 관찰 대상(Subject) 역할을 합니다.

subject.on("updatePost", () => {
  console.log("This post is so awesome!");
});
// observer 1: updatePost 이벤트 발생 시 실행될 리스너를 등록합니다.

subject.on("updatePost", () => {
  console.log("I like this post!");
});
// observer 2: 동일 이벤트에 추가적인 리스너를 등록합니다.
// 하나의 이벤트에 여러 리스너를 등록할 수 있습니다.

subject.on("createPost", (type) => {
  console.log(`I like this ${type} post!`);
});
// observer 3: createPost 이벤트 발생 시 실행될 리스너를 등록합니다.
// 이 리스너는 이벤트와 함께 전달된 데이터를 사용합니다.

process.on("beforeExit", (code) => {
  console.log("Process beforeExit event with code: ", code);
});
// process 객체는 Node.js 전역 객체로, 이벤트 기반으로 동작합니다.

process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

subject.emit("updatePost");
// emit 메서드는 updatePost 이벤트를 트리거하여, 등록된 모든 리스너를 실행합니다.

subject.emit("createPost", "image");
// emit 메서드는 이벤트와 함께 추가 데이터를 전달할 수 있습니다.
