function not(id) {
    this.id = id;
    this.name = "#" + this.id;
    this.rep = add(80, 80, "green", "black", this.id, true);
    this.pin1 = new pin(0);
    this.o = new pin(1);
    this.o.nei = this;
    //this.text = new text(this,"Or-gate");
    this.activation = function() {
        if (!this.pin1.val) {
            return true;
        }
        return false;
    }

    this.x = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("x"));
    }

    this.y = function() {
        let name = "#" + this.id;
        return parseFloat($(name).attr("y"));
    }

    //design
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    $(g).attr({
        width: "100%",
        height: "100%"
    });
    let skin = $(document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')).attr({
        x: "50",
        y: "50",
        id: (id + "-skin"),
        width: "80",
        height: "80"
    });
    let img = $(document.createElement('img')).attr({
        height: "80",
        width: "80",
        src: "textures/gates/not_gate.jpg"
    });
    let iDiv = document.createElement("div");
    $(iDiv).append(img);
    this.skin = skin;
    this.img = img;
    $(skin).append(iDiv);
    //noname(this);
    $(g).append(skin);
    let elem = document.getElementById("svg1");
    elem.appendChild(g);

    //updating
    this.update = function() {
        //the main object and his pins
        let x = this.x();
        let y = this.y();
        this.pin1.set(x - 20, y + 30);
        this.o.set(x + 80, y + 30);

        //and the skin
        let name = "#" + this.id + "-skin";
        let skin = $(name);
        skin.attr("x", (parseFloat($((this.rep)).attr("x")) + 4).toString());
        skin.attr("y", (parseFloat($((this.rep)).attr("y")) + 4).toString());
    }
    pieces[pieces.length] = this;

    addclk11(this);
}

function addclk11(ob) {
    $((ob.img)).on("mousedown touchstart", function(e) {
        e.preventDefault();
        let svg = document.getElementById("svg1");
        $(svg).append(ob.rep);
        $(svg).append($(ob.pin1.rep));
        $(svg).append($(ob.o.rep));
        $(svg).append($(ob.skin));
        selected = ob.id;
    });
    $((ob.img)).on("mouseup touchend", function() {
        selected = "yay";
    });
}