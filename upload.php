<?php
    // move uploaded file to whatever name was specified
    move_uploaded_file ($_FILES["upload"]["tmp_name"], "./" . $_FILES["upload"]["name"]);
?>