/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2014 OA Wu Design
 */
$(function () {
//   // function clearPanel(){
//   //   // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
//   //   console.info ('clearPanel');
//   // }

//   // Path.map("#/users").to(function(){
//   //     alert("Users!");
//   // });

//   // Path.map("#/comments").to(function(){
//   //     console.info("#/comments");
//   // }).enter(clearPanel);

//   // Path.map("#/posts").enter(function(){
//   //     console.info("A[enter]");
//   // }).to(function(){
//   //     console.info("A[action]");
//   // }).exit(function(){
//   //     console.info("A[exit]");
//   // });

//   // // Path.root("#/posts");

//   // location.hash = "#/posts";
//   // // setTimeout (function () {
//   // //   location.hash = "#/comments";
//   // // }, 5000);

//   // Path.listen();

//   // oaJa.


  Path.map("#/page1").enter(function(){
      console.info("A[enter]");
  }).to(function(){
      console.info("A[action]");
  }).exit(function(){
      console.info("A[exit]");
  });
  Path.root("#/page1");
  Path.listen();
});
