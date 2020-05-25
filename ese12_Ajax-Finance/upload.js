$(document).ready(function(){
    let _url = "";
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const redirect_uri = "http://127.0.0.1:8080/upload.html" // replace with your redirect_uri;
    const client_secret = "L9pIqQk4qF4rDg2EH1Q2lQbG"; // replace with your client secret
    const scope = "https://www.googleapis.com/auth/drive";
    let access_token= "";
    let client_id = "615282420126-mj8p31p0vpvkkeu48t0cq3k9cu8fkp0b.apps.googleusercontent.com"// replace it with your client id;
    $("#ok").hide();
    setToken(client_id,client_secret,redirect_uri,code,scope);

    $("#upload").on("click", function (e) 
    {
        var file = $("#files")[0].files[0];
        var upload = new Upload(file);
        // execute upload
        upload.doUpload();
        $("#ok").show();
        setTimeout(function(){
            window.location="index.html";
        },3000);
    });
   

    function stripQueryStringAndHashFromPath(url) 
    {
        return url.split("?")[0].split("#")[0];
    }   

    var Upload = function (file) 
    {
        this.file = file;
    };
    
    Upload.prototype.getType = function() 
    {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };
    Upload.prototype.getSize = function() 
    {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };
    Upload.prototype.getName = function() 
    {
        return this.file.name;
    };
    Upload.prototype.doUpload = function () 
    {
        var that = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);

            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    Upload.prototype.progressHandling = function (event) 
    {
        var percent = 0;
        var position = event.loaded || event.position;
        var total = event.total;
        var progress_bar_id = "#progress-wrp";
        if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
        }
        // update progressbars classes so it fits your code
        $(progress_bar_id + " .progress-bar").css("width", +percent + "%");
        $(progress_bar_id + " .status").text(percent + "%");
    };
});