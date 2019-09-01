// 提供对 aid.zengrong.net 的调用，依赖 jQuery

function download(id) {
  if (DL_INFO_URL === undefined || DL_GO_URL === undefined) {
    alert('AID 未定义')
    return
  }
  var rid = '#dl-div-' + id
  var infoURL = DL_INFO_URL.replace('%s', id)
  var goURL = DL_GO_URL.replace('%s', id)
  $.getJSON(infoURL, function (data) {
    if (data.error) {
      $(rid).text(data.message)
      $(rid).addClass('bg-danger')
    }
    else {
      $(rid).empty()
      $(rid).addClass('bg-info')
      let f = data.file
      var ul = $('<ul>')
      ul.append($('<li>').text(f.file_name))
      ul.append($('<li>').text(f.file_date))
      ul.append($('<li>').text(f.file_hits))
      if (f.file_des) {
      ul.append($('<li>').text(data.file_des))
      }
      // TODO file的值可能是相对路径，需要判断
      let file = null
      if (f.file.indexOf('http') === 0) {
        file = f.file
      }
      else {
        file = goURL
      }
      var a = '<a href="' + file + '" target="_blank">下载文件</a>'
      ul.append($('<li>').html(a))
      $(rid).append(ul)
    }
  })
}