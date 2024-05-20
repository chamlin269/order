<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CTU Canteen</title>
    <link rel="stylesheet" href="./style.css" />
    <link rel="stylesheet" href="./orderstyle.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="login info.css" />

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  </head>
  <body>
    <div class="whole"></div>

    <div class="chatroom">
      <div class="chat-header">
        <h2>Ordering</h2>
      </div>
      <div class="chat-window" id="chatWindow">
        <p>
          Welcome to CTU canteen. Ordering Bot. Would you like to order?
          <br /><br />
          <button type="button" onclick="sendMessage('Yes')">Yes</button>
          <button type="button" onclick="sendMessage('No')">No</button>
        </p>
        <div id="chatcontainer"></div>
        <div id="chatcontainer2"></div>
        <div id="chatcontainer3"></div>
        <div id="chatcontainer4"></div>
        <div id="chatcontainer5"></div>
      </div>
      <div class="chat-input">
        <input type="text" id="chatMessage" placeholder="Type a message..." />
      </div>
    </div>
    <div class="move">
      <h2>Your Cart:</h2>
      <div id="addtocart"></div>
      <div class="clss">
      <div class="cart">
        <p id="orders"></p>
        <p id="orders2"></p>
        <p id="orders3"></p>
        <p id="orders4"></p>
        <p id="orders5"></p>
        <p id="orders6"></p>
      </div>
    </div>
    <div class="contain">
      <div class="totaltanan"></div>
</div>
      <button type="button" id="toggles">Checkout</button>
    </div>

    <br />
    <div class="containerform" style="width: 500px; height: 500px;">
      <h3 align="">PLACE ORDER</h3>
      <br />
      <form method="post" id="dishForm">
        <div id="error"></div>
        <br />
        <label>Enter Name</label>
        <input type="text" name="name" class="form-control" /><br />
        <label>Enter Phone Number</label>
        <input type="text" name="number" class="form-control" /><br />
        <label>Select DineIn or Takeout --</label>
        <select name="method" class="box" required>
          <option value="" disabled selected>
            Select DineIn or Takeout --
          </option>
          <option value="Dine In">Dine In</option>
          <option value="Takeout">Takeout</option>
        </select>
        <br /><br />
        <label>Select Payment Method --</label>
        <select name="paymentMethod" class="box" required>
          <option value="" disabled selected>Select Payment Method --</option>
          <option value="Pay at the counter">Pay at the counter</option>
          <option value="Gcash">Gcash</option>
        </select>
        <br /><br />
        <input
          type="button"
          id="toggle"
          value="Submit to Confirm"
          class="btn btn-info"
        /><br />
        <div id="message"></div>
      </form>
    </div>
    <br />

    <script>
      var OTP = document.querySelector(".otp");
      var trigger = document.getElementById("toggles");
      var form = document.getElementById("dishForm");
      var contain = document.querySelector(".containerform");
      var bg = document.querySelector(".whole");
      var move = document.querySelector(".move");
      var moveNasd = document.querySelector(".total");

      trigger.addEventListener("click", function () {
        document.querySelector(".chat-window").innerHTML = "";
        document.querySelector(".contain").innerHTML = "";
        contain.classList.toggle("activate");
        bg.classList.toggle("change");
        move.classList.toggle("right");
        moveNasd.classList.toggle("right");
      });

      var bg = document.querySelector(".whole");
      var gcash = document.querySelector(".cashG");
      var number = document.querySelector(".gcash");
      number.addEventListener("click", function () {
        form.classList.toggle("hide");
        bg.classList.toggle("changes");
        gcash.classList.toggle("godown");
      });

      const close = document.querySelector(".close");
      close.addEventListener("click", function () {
        document.querySelector(".containee").innerHTML;
        gcash.classList.toggle("move");
      });
      const bottom = document.querySelector(".phone");
      const phoneNumber = document.querySelector(".number");
      phoneNumber.addEventListener("click", function () {
        bottom.classList.toggle("bottom");
      });3
      const close2 = document.querySelector(".close2");
      close2.addEventListener("click", function () {
        bottom.classList.toggle("moveup");
      });
  
    </script>
    <script>    document.getElementById("toggle").addEventListener("click", function () {
        const orderCheckout = document.querySelector(".clss").innerHTML;

        // Collect form data
        const formData = {
          name: document.querySelector('input[name="name"]').value,
          number: document.querySelector('input[name="number"]').value,
          method: document.querySelector('select[name="method"]').value,
          paymentMethod: document.querySelector('select[name="paymentMethod"]')
            .value,
          cartContent: orderCheckout,
        };

        // Send data using AJAX
        $.ajax({
          url: "process.php",
          type: "POST",
          data: formData,
          success: function (response) {
            $("#message").html(response);
          },
          error: function (xhr, status, error) {
            $("#error").html(
              "<label class='text-danger'>An error occurred</label>"
            );
          },
        });
      });</script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./products.json"></script>
    <script src="./orderjs.js"></script>
  </body>
</html>
