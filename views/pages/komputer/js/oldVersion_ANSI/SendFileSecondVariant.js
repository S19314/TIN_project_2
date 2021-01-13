$(":file").change(function(event) {
  var files = this.files;
  for (var i = 0; i < files.length; i++) {
    (function(n) {
      var img = new Image;
      img.onload = function() {
        $("body").append(this)
      }
      img.src = window.URL.createObjectURL(files[n])
    }(i))
  }
})


/*
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js">
</script>
<input type="file" accepts="image/*" multiple webkitdirectory />
*/
