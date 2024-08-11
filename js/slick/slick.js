$(function () {
    $('#js-slider').slick({
      arrows: true, // 前・次のボタンを表示する
      dots: true, // ドットナビゲーションを表示する
      speed: 1000, // スライドさせるスピード（ミリ秒）
      centerMode: true, // slidesToShowが奇数のとき、現在のスライドを中央に表示する
      slidesToShow: 3,
      variableWidth: true, // スライド幅の自動計算を無効化
      centerPadding: '40px',
      autoplay: true,
      autoplaySpeed:2000,
    });
  });