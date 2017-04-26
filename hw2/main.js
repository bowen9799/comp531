window.onload = function() {
    // links to pictures
    var urls = ["http://agentleandquitespirit.com/wp-content/uploads/2015/09/clean-sea-coast-and-clear-water-website-header.jpg", 
    "http://www.freewebheaders.com/wordpress/wp-content/gallery/lights/colorful-abstract-street-lighting-website-header.jpg", 
    "http://mtstours.org/Promotionimages/Beach_Banner_(1).jpg",
    "https://d172vyvma702ee.cloudfront.net/system/uploads/image/asset/1649/Miami_header.jpg?v=1404764240", 
    "http://and-not-or.com/wp-content/uploads/2011/12/cropped-website-header.jpg", 
    "https://gsoulen.files.wordpress.com/2016/10/water-and-beaches-website-headers-1000x288.jpg",
    "http://toddwjohnson.com/wp-content/uploads/2011/02/cropped-Sample-Header.jpg", 
    "http://ymbproperties.com/blog/wp-content/uploads/2014/04/ClearSpeak-Header-page-2.jpg", 
    "http://allegiance.in/wordpress/wp-content/uploads/2014/08/cropped-wordpress_header.jpg"];

    // the reason to repeat code for caching images is that images for each "card"
    // would be later accessed independently of other "cards".
    var images_1 = urls.slice(0,3).map(function (url) {
        var aaa = new Image();
        aaa.src = url;
        return aaa
    });

    var images_2 = urls.slice(3,6).map(function (url) {
        var aaa = new Image();
        aaa.src = url;
        return aaa
    });

    var images_3 = urls.slice(6,9).map(function (url) {
        var aaa = new Image();
        aaa.src = url;
        return aaa
    });

    var idx1 = 0;
    var idx2 = 0;
    var idx3 = 0;

    // initialize intervals for access of functions below
    var change1;
    var change2;
    var change3;

    function card1 () {
        var rand = (Math.random() + 1) * 2500;
        idx1 = (idx1+1) % 3;
        document.getElementById("images1").src = images_1[idx1].src;
        clearInterval(change1);
        change1 = setInterval(function(){card1()}, rand);
    }

    function card2 () {
        var rand = (Math.random() + 1) * 2500;
        idx2 = (idx2+1) % 3;
        document.getElementById("images2").src = images_2[idx2].src;
        clearInterval(change2);
        change2 = setInterval(function(){card2()}, rand);
    }

    function card3 () {
        var rand = (Math.random() + 1) * 2500;
        idx3 = (idx3+1) % 3;
        document.getElementById("images3").src = images_3[idx3].src;
        clearInterval(change3);
        change3 = setInterval(function(){card3()}, rand);
    }

    card1();
    card2();
    card3();

    // each start/stop button needs onclick to fire a function that stop/start changing images 
    document.getElementById("bt1").addEventListener("click", function(){clicked(change1, idx1, "images1", images_1, "bt1")});
    document.getElementById("bt2").addEventListener("click", function(){clicked(change2, idx2, "images2", images_2, "bt2")});
    document.getElementById("bt3").addEventListener("click", function(){clicked(change3, idx3, "images3", images_3, "bt3")});

    // this function checks for start/stop images from switching by clear/set intervals to change images 
    function clicked (change, idx, imgid, img, id){
        bt = document.getElementById(id);
        if(bt.innerHTML == "Stop"){
            bt.innerHTML = "Start";
            clearInterval(change);
        } else {
            bt.innerHTML = "Stop";
            var a = function card () {
                var rand = (Math.random() + 1) * 2500;
                idx = (idx+1) % 3;
                document.getElementById(imgid).src = img[idx].src;
                clearInterval(change);
                change = setInterval(function(){card()}, rand);
            }();
        }
    }
}