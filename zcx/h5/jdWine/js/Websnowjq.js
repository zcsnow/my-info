!function(a) {
    a.fn.websnowjq = function(b) {
        function q() {
            j = document.getElementById("websnowjqcan" + d),
            k = j.getContext("2d"),
            l = document.createElement("canvas"),
            m = l.getContext("2d"),
            m.canvas.width = k.canvas.width,
            m.canvas.height = k.canvas.height,
            o = setInterval(r, 200),
            t(),
            setInterval(v, 50),
            a(window).resize(function() {
                a("#websnowjqcan" + d).offset({
                    top: a(c).offset().top,
                    left: a(c).offset().left
                })
            })
        }
        function r() {
            n[n.length] = new s,
            n.length == p.snowFlakes && clearInterval(o)
        }
        function s() {
            this.x = Math.round(Math.random() * k.canvas.width),
            this.y = -10,
            this.speed = Math.round(5 * Math.random()) + 1,
            this.width = 1 * Math.random() + 0.5,
            this.drift = Math.random()
        }
        function t() {
            k.save(),
            u();
            for (var a = 0; a < n.length; a++)
                m.beginPath(),
                m.arc(n[a].x, n[a].y, n[a].width, 0, 2 * Math.PI, !1),
                m.fillStyle = "#ffffff",
                m.fill();
            k.drawImage(l, 0, 0, l.width, l.height),
            k.restore()
        }
        function u() {
            m.clearRect(0, 0, m.canvas.width, m.canvas.height),
            k.clearRect(0, 0, m.canvas.width, m.canvas.height)
        }
        function v() {
            w(),
            t()
        }
        function w() {
            for (var a = 0; a < n.length; a++)
                n[a].y < k.canvas.height ? (n[a].y += n[a].speed,
                n[a].y > k.canvas.height && (n[a].y = -5),
                n[a].x += n[a].drift,
                n[a].x > k.canvas.width && (n[a].x = 0)) : (n.splice(a, 1),
                n[n.length] = new s)
        }
        var c = this[0]
          , d = c.id
          , e = a(c).offset().left
          , f = a(c).offset().top
          , g = window.innerHeight//a(c).height()
          , h = window.innerWidth//a(c).width()
          , i = "top:" + f + "px;" + "left:" + e + "px;" + "position:absolute;"
          , j = null
          , k = null
          , l = null
          , m = null
          , n = []
          , o = null
          , p = a.extend({
            snowFlakes: 100
        }, b);
        a("#"+d).append("<canvas width='" + h + "' height='" + g + "' id='websnowjqcan" + d + "' style='" + i + "'></canvas>"),
        q()
    }
}(jQuery);
