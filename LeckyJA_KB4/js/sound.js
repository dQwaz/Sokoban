function toggleSound() {
    var elements = document.getElementsByTagName('audio');
    for(var e = 0; e < elements.length; elements[e].muted = !elements[e].muted, e++);
  }