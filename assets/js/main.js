var editor1 = CodeMirror.fromTextArea(document.getElementById('editor1'), {
  mode: "text/html",
  lineNumbers: true,
});
var editor2 = CodeMirror.fromTextArea(document.getElementById('editor2'), {
  lineNumbers: true,
});
var editor3 = CodeMirror.fromTextArea(document.getElementById('editor3'), {
  lineNumbers: true,
});
var editor4 = CodeMirror.fromTextArea(document.getElementById('editor4'), {
  lineNumbers: true,
});
var result = CodeMirror.fromTextArea(document.getElementById('result'), {
  lineNumbers: true,
})

var arrDatasLength = [1, 1, 1, 1];
var delDuplicates = null;

class Form {
  constructor() {
    this.operation = null;
    this.value = null;
    this.value2 = null;
    this.data = [];
  }
};

var form1 = new Form();
var form2 = new Form();
var form3 = new Form();
var form4 = new Form();

editor1.on('change', function (e) {
  form1.data = takeAndclearData(e);
  arrDatasLength['0'] = form1.data.length || 1;

  if (form1.data.length) {
    $('.form1').find('input')
      .prop('checked', false)
      .prop('disabled', true);
  } else {
    $('.form1').find('input[type=radio]')
      .prop('disabled', false);
  }

  // lines count
  $('.header-editor1-info').html("Lines: " + editor1.lineCount());
});

editor2.on('change', function (e) {
  form2.data = takeAndclearData(e);
  arrDatasLength['1'] = form2.data.length || 1;

  if (form2.data.length) {
    $('.form2').find('input')
      .prop('checked', false)
      .prop('disabled', true);
  } else {
    $('.form2').find('input[type=radio]')
      .prop('disabled', false);
  }

  // lines count
  $('.header-editor2-info').html("Lines: " + editor2.lineCount());
});

editor3.on('change', function (e) {
  form3.data = takeAndclearData(e);
  arrDatasLength['2'] = form3.data.length || 1;

  if (form3.data.length) {
    $('.form3').find('input')
      .prop('checked', false)
      .prop('disabled', true);
  } else {
    $('.form3').find('input[type=radio]')
      .prop('disabled', false);
  }

  // lines count
  $('.header-editor3-info').html("Lines: " + editor3.lineCount());
});

editor4.on('change', function (e) {
  form4.data = takeAndclearData(e);
  arrDatasLength['3'] = form4.data.length || 1;

  if (form4.data.length) {
    $('.form4').find('input')
      .prop('checked', false)
      .prop('disabled', true);
  } else {
    $('.form4').find('input[type=radio]')
      .prop('disabled', false);
  }

  // lines count
  $('.header-editor4-info').html("Lines: " + editor4.lineCount());
});

result.on('change', function () {
  $('.header-result-info').html("Lines: " + result.lineCount());
});

$('.options').on('input', function (e) {
  var $this = $(this);
  var $target = $(e.target);
  var $inputs = $this.find('input[type=number]');
  var operation = $target.attr('data-operation-name');
  var form = $target.attr('data-form-name');

  if ($target.prop('type') == 'radio') {
    var $input = $target.next().find('input');
    $inputs.prop('disabled', true);
    $target.parent().find('input[type=number]').prop('disabled', false);

    switch (operation) {
      case "random-num": {
        window[form].operation = operation;
        window[form].value = $input.val();
        break;
      }
      case "serial-num": {
        var from = $target.parent().find('input[type=number]').first().val();
        var to = $target.parent().find('input[type=number]').last().val();
        window[form].operation = operation;
        window[form].value = from;
        window[form].value2 = to;
        break;
      }
      case "random-letters": {
        window[form].operation = operation;
        window[form].value = $input.val();
        break;
      }
      case "random-names": {
        window[form].operation = operation;
        break;
      }
      case "random-cities": {
        window[form].operation = operation;
        break;
      }
    }
  };

  if ($target.prop('type') == 'number') {
    switch (operation) {
      case "random-num": {
        window[form].operation = operation;
        window[form].value = $target.val();
        break;
      }
      case "serial-num": {
        var from = $target.parent().find('input[type=number]').first().val();
        var to = $target.parent().find('input[type=number]').last().val();
        window[form].operation = operation;
        window[form].value = from;
        window[form].value2 = to;
        break;
      }
      case "random-letters": {
        window[form].operation = operation;
        window[form].value = $target.val();
        break;
      }
    }
  };
});


$('#run').on('click', () => { // RUN
  var maxRow = getMaxRow();
  var data1 = [];
  var data2 = [];
  var data3 = [];
  var data4 = [];
  var result = [];
  var delDuplicates = $('#deleteDuplicateFromOneForm').prop('checked');

  if (delDuplicates) { // delete duplicates
    form1.data = deleteDuplicates(form1.data);
    arrDatasLength['0'] = form1.data.length || 1;

    form2.data = deleteDuplicates(form2.data);
    arrDatasLength['1'] = form2.data.length || 1;

    maxRow = getMaxRow();
  } else {
    form1.data = takeAndclearData(editor1);
    arrDatasLength['0'] = form1.data.length || 1;

    form2.data = takeAndclearData(editor2);
    arrDatasLength['1'] = form2.data.length || 1;

    maxRow = getMaxRow();
  }


  if (form1.data.length) {
    while (data1.length < maxRow) {
      for (let i = 0; i < maxRow && i < form1.data.length; i++) {
        data1.push(form1.data[i]);
      };
      i = 0;
    }
  } else {
    switch (form1.operation) {
      case "random-num": {
        for (let i = 0; i < maxRow; i++) {
          data1.push(randomNum(form1.value));
        }
        break;
      }
      case "serial-num": {
        var from = form1.value;
        var to = form1.value2;
        while (data1.length < maxRow) {
          if (from < to) { // up
            for (let i = from; i <= +to && data1.length < maxRow; i++) {
              data1.push(i);
            }
          } else { // down
            for (let i = from; i >= +to && data1.length < maxRow; i--) {
              data1.push(i);
            }
          }
          i = from;
        }
        break;
      }
      case "random-letters": {
        for (let i = 0; i < maxRow; i++) {
          data1.push(randomABC(form1.value));
        }
        break;
      }
      case "random-names": {
        for (let i = 0; i < maxRow; i++) {
          data1.push(randomName());
        }
        break;
      }
      case "random-cities": {
        for (let i = 0; i < maxRow; i++) {
          data1.push(randomCities());
        }
        break;
      }
    };
  }

  if (form2.data.length) {
    while (data2.length < maxRow) {
      for (let i = 0; i < maxRow && i < form2.data.length; i++) {
        data2.push(form2.data[i]);
      };
      i = 0;
    }
  } else {
    switch (form2.operation) {
      case "random-num": {
        for (let i = 0; i < maxRow; i++) {
          data2.push(randomNum(form2.value));
        }
        break;
      }
      case "serial-num": {
        var from = form2.value;
        var to = form2.value2;
        while (data2.length < maxRow) {
          if (from < to) { // up
            for (let i = from; i <= +to && data2.length < maxRow; i++) {
              data2.push(i);
            }
          } else { // down
            for (let i = from; i >= +to && data2.length < maxRow; i--) {
              data2.push(i);
            }
          }
          i = from;
        }
        break;
      }
      case "random-letters": {
        for (let i = 0; i < maxRow; i++) {
          data2.push(randomABC(form2.value));
        }
        break;
      }
      case "random-names": {
        for (let i = 0; i < maxRow; i++) {
          data2.push(randomName());
        }
        break;
      }
      case "random-cities": {
        for (let i = 0; i < maxRow; i++) {
          data2.push(randomCities());
        }
        break;
      }
    };
  }

  if (form3.data.length) {
    while (data3.length < maxRow) {
      for (let i = 0; i < maxRow && i < form3.data.length; i++) {
        data3.push(form3.data[i]);
      };
      i = 0;
    }
  } else {
    switch (form3.operation) {
      case "random-num": {
        for (let i = 0; i < maxRow; i++) {
          data3.push(randomNum(form3.value));
        }
        break;
      }
      case "serial-num": {
        var from = form3.value;
        var to = form3.value2;
        while (data3.length < maxRow) {
          if (from < to) { // up
            for (let i = from; i <= +to && data3.length < maxRow; i++) {
              data3.push(i);
            }
          } else { // down
            for (let i = from; i >= +to && data3.length < maxRow; i--) {
              data3.push(i);
            }
          }
          i = from;
        }
        break;
      }
      case "random-letters": {
        for (let i = 0; i < maxRow; i++) {
          data3.push(randomABC(form3.value));
        }
        break;
      }
      case "random-names": {
        for (let i = 0; i < maxRow; i++) {
          data3.push(randomName());
        }
        break;
      }
      case "random-cities": {
        for (let i = 0; i < maxRow; i++) {
          data3.push(randomCities());
        }
        break;
      }
    };
  }

  if (form4.data.length) {
    while (data4.length < maxRow) {
      for (let i = 0; i < maxRow && i < form4.data.length; i++) {
        data4.push(form4.data[i]);
      };
      i = 0;
    }
  } else {
    switch (form4.operation) {
      case "random-num": {
        for (let i = 0; i < maxRow; i++) {
          data4.push(randomNum(form4.value));
        }
        break;
      }
      case "serial-num": {
        var from = form4.value;
        var to = form4.value2;
        while (data4.length < maxRow) {
          if (from < to) { // up
            for (let i = from; i <= +to && data4.length < maxRow; i++) {
              data4.push(i);
            }
          } else { // down
            for (let i = from; i >= +to && data4.length < maxRow; i--) {
              data4.push(i);
            }
          }
          i = from;
        }
        break;
      }
      case "random-letters": {
        for (let i = 0; i < maxRow; i++) {
          data4.push(randomABC(form4.value));
        }
        break;
      }
      case "random-names": {
        for (let i = 0; i < maxRow; i++) {
          data4.push(randomName());
        }
        break;
      }
      case "random-cities": {
        for (let i = 0; i < maxRow; i++) {
          data4.push(randomCities());
        }
        break;
      }
    };
  }

  for (let i = 0; i < maxRow; i++) {
    result.push((data1[i] || '') + (data2[i] || '') + (data3[i] || '') + (data4[i] || ''));
  };

  print_result(result);
});


function takeAndclearData(editor) {
  var $data = editor
    .getValue()
    .split('\n')
    .map((elem) => elem.trim())
    .filter((elem) => !!elem);

  return $data;
}

function deleteDuplicates(dataArr) {
  var result = dataArr.filter((elem, i, self) => {
    return !!elem && i === self.indexOf(elem);
  });
  return result;
};

function cloneArr(oldArr) {
  return $.merge([], oldArr);
};

function print_result(arrData) {
  result.setValue(arrData.join('\n'));
};

function getMaxRow() {
  var newArr = cloneArr(arrDatasLength);
  return newArr.sort((a, b) => a - b).reverse()[0];
};

function randomNum(significance) {
  var min = 1;
  var max = 9;

  if (significance == 2) {
    min = 10;
    max = 99;
  }
  if (significance == 3) {
    min = 100;
    max = 999;
  }
  if (significance == 4) {
    min = 1000;
    max = 9999;
  }
  if (significance == 5) {
    min = 10000;
    max = 99999;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomABC(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomName() {
  var random = Math.floor(Math.random() * names.length);
  return names[random].toLowerCase();
}

function randomCities() {
  var random = Math.floor(Math.random() * cities.length);
  return cities[random].toLowerCase();
}

$('button[title="Копировать"]').on('click', function () { // copy clipboard
  // copy clipboard
  var editorName = $(this).attr('data-editor');
  var editor = window[editorName];
  var $temp = $("<textarea>");
  $("body").append($temp);
  $temp.val(editor.getValue()).select();
  document.execCommand("copy");
  $temp.remove();

  // Tooltip
  $(this).attr('data-original-title', 'Скопировано!');
  $(this).tooltip("show");
});

$('button[title="Очистить форму"]').on('click', function () { // clear form
  var editorName = $(this).attr('data-editor');
  var editor = window[editorName];
  editor.setValue('');

  $(this).tooltip("hide");
});

$('button[rel="tooltip"]').tooltip(); // run tooltips

$('.options').on('click', function (e) { // off radio
  var $target = $(e.target);
  if ($target.attr('type') == 'radio' && e.ctrlKey) {
    $target.prop('checked', false);
    $(this).find('input[type=number]').prop('disabled', true);

    var form = $target.attr('data-form-name'); // refresh form
    window[form] = new Form();

  } else if ($target.prev().attr('type') == 'radio' && e.ctrlKey) {
    $target.prev().prop('checked', false);
    $(this).find('input[type=number]').prop('disabled', true);

    var form = $target.prev().attr('data-form-name'); // refresh form
    window[form] = new Form();
  }



});