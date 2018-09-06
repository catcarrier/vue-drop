<template>
    <div class="container">
      <h1 align=center>A File Preview Demo</h1>
      <div id="status">Drag the files from a folder to a selected area ...</div>

      <div id="drop">Drop files here.</div>
      <div id="list"></div>
      <hr>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <li v-for="(data, index) in vendors" :key="index">
          <span>{{data.name}}</span>
          <span>{{data.number}}</span>   
          <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
        </li>
        </transition-group>
      </ul>
    </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     vendors: [
  //       { name: "Castor", number: "10012", product: "stardust" },
  //       { name: "Pollux", number: "90453", product: "pixels" }
  //     ]
  //   };
  // },
  methods: {
    init() {
      if (window.FileReader) {
        addEventHandler(window, "load", function() {
          var status = document.getElementById("status");
          var drop = document.getElementById("drop");
          var list = document.getElementById("list");

          function cancel(e) {
            if (e.preventDefault) {
              e.preventDefault();
            }
            return false;
          }

          // Tells the browser that we *can* drop on this target
          addEventHandler(drop, "dragover", cancel);
          addEventHandler(drop, "dragenter", cancel);

          addEventHandler(drop, "drop", function(e) {
            e = e || window.event; // get window.event if e argument missing (in IE)
            if (e.preventDefault) {
              e.preventDefault();
            } // stops the browser from redirecting off to the image.

            var dt = e.dataTransfer;
            var files = dt.files;

            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              var reader = new FileReader();

              addEventHandler(
                reader,
                "loadend",
                function(e, file) {
                  console.log(file);

                  // if csv ingest it, otherwise ignore it
                  if (file.name.toLowerCase().endsWith("csv")) {
                    var text = this.result;


                    // var content = document.createElement("div");
                    // content.innerHTML = text;
                    // list.appendChild(content);

                    // TODO validate the file
                    var rows = text.split('\n');
                    parseData( rows, (err, data) => {
                      if(err) {
                        // TODO set the error state
                      } else {
                        // TODO push the data into the store
                        
                      }
                    } )

                    // TODO ingest the data


                    // TODO add the data to the store

                  } else {
                    console.log(file.name + " not expected extension, skipping")
                  }
                }.bindToEventHandler(file)
              );

              reader.readAsText(file);
            }
            return false;
          });
        });
      } else {
        document.getElementById("status").innerHTML =
          "Your browser does not support the HTML5 FileReader.";
      }

      function parseData(rows, cb) {
        // TODO validate data
        // each row must contain three elements, none blank


        // parse into objects
        // return dummy objects for now
        var objects = [
          { name: "Donner", number: "55555", product: "thunder" },
          { name: "Blitzen", number: "88888", product: "lightning" }
        ];

        cb(null, objects)
      }

      function addEventHandler(obj, evt, handler) {
        if (obj.addEventListener) {
          // W3C method
          obj.addEventListener(evt, handler, false);
        } else if (obj.attachEvent) {
          // IE method.
          obj.attachEvent("on" + evt, handler);
        } else {
          // Old school method.
          obj["on" + evt] = handler;
        }
      }

      Function.prototype.bindToEventHandler = function bindToEventHandler() {
        var handler = this;
        var boundParameters = Array.prototype.slice.call(arguments);
        //create closure
        return function(e) {
          e = e || window.event; // get window.event if e argument missing (in IE)
          boundParameters.unshift(e);
          handler.apply(this, boundParameters);
        };
      };
    },
    remove(index) {}
  },
  computed: {
    vendors: {
      get() {
        return this.$store.getters.vendors;
      }
    }
  },
  beforeMount() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

#drop {
  min-height: 150px;
  width: 250px;
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
}

.holder {
  background: #fff;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

ul li {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}

p {
  text-align: center;
  padding: 30px 0;
  color: gray;
}

.container {
  box-shadow: 0px 0px 40px lightgray;
}

input {
  width: calc(100% - 40px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  background-color: #323333;
  color: #687f7f;
}

.alert {
  background: #fdf2ce;
  /*font-weight: bold;*/
  display: inline-block;
  padding: 2px;
  margin-top: -10px;
}

.alert-in-enter-active {
  animation: bounce-in 0.1s;
}
.alert-in-leave-active {
  animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

i {
  float: right;
  cursor: pointer;
}
</style>
