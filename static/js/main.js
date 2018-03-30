/*var map = L.map('mapid', {
    center: [51.505, -0.09],
    zoom: 13
});*/
$('#discard').click(function(){
    console.log('discarded');
  $('#file_upload').val("");
    
  $('#file_upload').parent().removeClass('hide');
  $('#file_upload').parent().parent().children('div.container').addClass('hide');

  $('p.helperT').html('Here you upload the image of which location you want to find');
});
var myInterval = setInterval(function() {
    console.log('in loop');
    if($('#file_upload').val()!=""){
        $('#file_upload').parent().addClass('hide');  
        $('#file_upload').parent().parent().children('div.container').removeClass('hide');
        $('p.helperT').html('<br><br>');
    }
        else{
            
            $('#file_upload').parent().removeClass('hide');
            $('#file_upload').parent().parent().children('div.container').addClass('hide');

            $('p.helperT').html('Here you upload the image of which location you want to find');

 
        }

}, 200);


$(function() {
    function getQueryStrings() {
        var vars = [], hash, hashes;
        if (window.location.href.indexOf('#') === -1) {
            hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        } else {
            hashes = window.location.href.slice(window.location.href.indexOf('?') + 1, window.location.href.indexOf('#')).split('&');
        }
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var session_id = '{{session_id}}';

    var app = new Vue({
        el: '#app',
        data: {
            session_id: session_id,
            text_lines: [],
            rtparams: {},
            timing: {},
            cpuinfo: '',
            meminfo: '',
            loadavg: '',
        },
        computed: {
            input_image_url: function() { return '/static/results/' + this.session_id + '/input.png'; },
            result_image_url: function() { return '/static/results/' + this.session_id + '/output.png'; },
            result_json_url: function() { return '/static/results/' + this.session_id + '/result.json'; },
        },
    });

    var render = function(session_id) {
        app.session_id = session_id;
        app.text_lines = ['loading'];
        $.get('/static/results/' + session_id + '/result.json', function(data) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }
            app.text_lines = data.text_lines;
            app.rtparams = data.rtparams;
            app.timing = data.timing;
            app.cpuinfo = data.cpuinfo
            app.meminfo = data.meminfo
            app.loadavg = data.loadavg
        });
    }

    if (session_id != 'dummy_session_id') {
        window.history.pushState({},"", '/?r=' + session_id);
        render(session_id);
    } else {
        var queryStrings = getQueryStrings();
        var rid = queryStrings['r'];
        if (rid) {
            render(rid);
        }
    }

})
