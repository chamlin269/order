<?php
$message = '';
$error = '';

if (isset($_POST["submit"])) {
    if (empty($_POST["code"])) {
        $error = "<label class='text-danger'>Enter Code</label>";
    } elseif (empty($_POST["title"])) {
        $error = "<label class='text-danger'>Enter Title</label>";
    } elseif (empty($_FILES["image"]["name"])) {
        $error = "<label class='text-danger'>Select Image</label>";
    } elseif (empty($_POST["price"])) {
        $error = "<label class='text-danger'>Enter Price</label>";
    } elseif (empty($_POST["servings"])) {
        $error = "<label class='text-danger'>Enter Servings</label>";
    } else {
        if (file_exists('dishes.json')) {
            $current_data = file_get_contents('dishes.json');
            $array_data = json_decode($current_data, true);
            
            // Upload image
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($_FILES["image"]["name"]);
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
            
            // Check if image file is an actual image or fake image
            $check = getimagesize($_FILES["image"]["tmp_name"]);
            if ($check === false) {
                $error = "<label class='text-danger'>File is not an image.</label>";
            } elseif (file_exists($target_file)) {
                $error = "<label class='text-danger'>Sorry, file already exists.</label>";
            } elseif ($_FILES["image"]["size"] > 500000) { // Adjust size limit as per your requirement
                $error = "<label class='text-danger'>Sorry, your file is too large.</label>";
            } elseif (!in_array($imageFileType, ["jpg", "png", "jpeg", "gif"])) {
                $error = "<label class='text-danger'>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</label>";
            } elseif (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                $extra = array(
                    'code'     => $_POST['code'],
                    'title'    => $_POST['title'],
                    'image'    => $target_file,
                    'price'    => $_POST["price"],
                    'servings' => $_POST["servings"],
                    'visible'  => true,
                    'deleted'  => false
                );
                $array_data['products'][] = $extra;
                $final_data = json_encode($array_data);
                if (file_put_contents('dishes.json', $final_data)) {
                    $message = "<label class='text-success'>File Appended Successfully</label>";
                } else {
                    $error = "<label class='text-danger'>Error in Appending Data</label>";
                }
            } else {
                $error = "<label class='text-danger'>Sorry, there was an error uploading your file.</label>";
            }
        } else {
            $error = "<label class='text-danger'>JSON File not exists</label>";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Dish</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<body>
<br />
<div class="container" style="width:500px;">
    <h3 align="">Add a dish</h3><br />
    <form method="post" enctype="multipart/form-data">
        <?php if (!empty($error)) { echo $error; } ?><br />
        <label>Code</label>
        <input type="text" name="code" class="form-control" /><br />
        <label>Title</label>
        <input type="text" name="title" class="form-control" /><br />
        <label>Input Image</label>
        <input type="file" name="image" class="form-control" /><br />
        <label>Price</label>
        <input type="text" name="price" class="form-control" /><br />
        <label>Servings</label>
        <input type="text" name="servings" class="form-control" /><br />
        <input type="submit" name="submit" value="Add" class="btn btn-info" /><br />
        <?php if (!empty($message)) { echo $message; } ?>
    </form>
</div>
<br />
</body>
</html>
