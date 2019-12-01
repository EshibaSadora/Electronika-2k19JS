function processFiles(files) {
    
    file = files[0];    
    reader = new FileReader();
    reader.readAsText(file);    
    comment = document.getElementById("comment");   
  

    reader.onload = function() {
        comment.value = reader.result;
      };
        
    
}