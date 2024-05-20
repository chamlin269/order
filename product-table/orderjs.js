function sendMessage(answer) {
  const chatWindow = document.getElementById("chatWindow");
  const chatContainer = document.getElementById("chatcontainer");
  const chatContainer2 = document.getElementById("chatcontainer2");
  const chatContainer3 = document.getElementById("chatcontainer3");
  const chatContainer4 = document.getElementById("chatcontainer4");
  const chatContainer5 = document.getElementById("chatcontainer5");
  const chatContainer6 = document.getElementById("chatcontainer6");

  if (chatWindow) {
    const messageElement = document.createElement("div");
    messageElement.textContent = answer;
    messageElement.className = "chat-message";

    chatContainer.appendChild(messageElement);

    // if the user presses the button 'yes'
    if (answer.toLowerCase() === "yes") {
      //reply element

      const replyElement = document.createElement("div");
      replyElement.textContent = " Please select a category:";
      replyElement.className = "reply-message";
      setTimeout(() => {
        chatContainer.appendChild(replyElement);
      }, 1000);
      chatContainer.scrollIntoView();

      /*const backButton = document.createElement("img");
   
            backButton.style.width = "30px";
            backButton.style.float = "left";
            continueElement.appendChild(backButton);

            const nextButton = document.createElement("img");
 
            nextButton.style.width = "30px";
            nextButton.style.position = "static";
            nextButton.style.background = "white";
            continueElement.appendChild(nextButton);

        
            nextButton.addEventListener("click", () =>{
                chatContainer2.scrollLeft += 300;
            });*/

      fetch("./category.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (products) {
          products.forEach(function (product) {
            const li = document.createElement("ul");

            li.innerHTML =
              '<div class="card mt-1">' +
              '<div class="product-1 align-items-center border p-2 text-center contain">' +
              '<img src="' +
              product.image +
              '" class="rounded" width="150" height="100" style="margin-top:40px;">' +
              '<h6 class="mt-4 font-weight-bold mb-2 info">' +
              product.title +
              "</h6>" +
              "</div>" +
              '<button  class="button-color' +
              product.class +
              '  p-2 text-center text-white">' +
              '<span class="text-uppercase"> Select</span></button>' +
              "</div>";
            chatContainer2.appendChild(li);
          });

          const orderButton = document.querySelector(".button-color1");

          orderButton.addEventListener("click", function () {
            const messElement = document.createElement("div");
            messElement.textContent = " This is our food menu for today:";
            messElement.className = "message";
            chatContainer3.appendChild(messElement);
            chatContainer3.scrollIntoView();
            let totalSum = 0; // Global variable to keep track of the total price

            fetch("./dishes.json")
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                const products = data.products;

                products.forEach(function (product) {
                  if (product.visible && !product.deleted) {
                    const li = document.createElement("ul");
                    li.innerHTML =
                      '<div class="card mt-1">' +
                      '<div class="product-1 align-items-center p-2 text-center">' +
                      '<img src="' +
                      product.image +
                      '" class="rounded" width="150" height="100" style="margin-top:30px;">' +
                      '<h6 class="mt-4 font-weight-bold mb-2 info">' +
                      product.title +
                      "</h6>" +
                      '<div class="cost mt-1 text-dark"> <span>₱' +
                      product.price +
                      "</span></div>" +
                      '<div class="quantity mt-2">' +
                      '<button class="minus btn btn-danger">-</button>' +
                      '<span class="quantity-number mx-2">0</span>' +
                      '<button class="plus btn btn-success">+</button>' +
                      "</div>" +
                      '<div class="total mt-1 text-dark"><span class="total-price">₱0</span></div>' + // Initial total price set to ₱0
                      "</div>" +
                      '<button class="food-order' +
                      product.code +
                      ' p-2 text-center text-white">' +
                      '<span class="text-uppercase">ORDER NOW</span>' +
                      "</button>";
                    chatContainer4.appendChild(li);

                    const quantityElement =
                      li.querySelector(".quantity-number");
                    const totalPriceElement = li.querySelector(".total-price");
                    const minusButton = li.querySelector(".minus");
                    const plusButton = li.querySelector(".plus");
                    const orderButton = li.querySelector(
                      ".food-order" + product.code
                    );

                    let quantity = 0;
                    let price = parseInt(product.price); // Ensure price is treated as a number

                    // Add event listener to the minus button
                    minusButton.addEventListener("click", function () {
                      if (quantity > 0) {
                        quantity--;
                        quantityElement.textContent = quantity;
                        const newTotalPrice = price * quantity;
                        updateTotalSum(-price);
                        totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                      }
                    });

                    // Add event listener to the plus button
                    plusButton.addEventListener("click", function () {
                      quantity++;
                      quantityElement.textContent = quantity;
                      const newTotalPrice = price * quantity;
                      updateTotalSum(price);
                      totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                    });

                    // Function to update the total sum

                    // Function to safely parse integer

                    // Add event listener to the order button
                    // Add event listener to the order button
                    orderButton.addEventListener("click", function () {
                      const quantity = safeParseInt(
                        li.querySelector(".quantity-number").textContent
                      );
                      const ordersContainer = document.getElementById("orders");

                      if (quantity > 0) {
                        const foodOrderText = `${
                          product.title
                        } x ${quantity} = ₱${price * quantity}`;
                        let foodOrderElement = Array.from(
                          ordersContainer.querySelectorAll(".orderFood")
                        ).find((el) => el.textContent.includes(product.title));

                        if (foodOrderElement) {
                          // Update existing order
                          foodOrderElement.textContent = foodOrderText;
                        } else {
                          // Create new order element
                          foodOrderElement = document.createElement("p");
                          foodOrderElement.textContent = foodOrderText;
                          foodOrderElement.className = "orderFood";
                          ordersContainer.appendChild(foodOrderElement);
                        }
                      } else if (quantity === 0) {
                        // Clear the previous order if quantity is 0
                        const foodOrderElement = Array.from(
                          ordersContainer.querySelectorAll(".orderFood")
                        ).find((el) => el.textContent.includes(product.title));
                        if (foodOrderElement) {
                          foodOrderElement.remove();
                        }
                      }
                      function safeParseInt(value) {
                        const parsed = parseInt(value, 10);
                        return isNaN(parsed) ? 0 : parsed;
                      }

                      // Function to update the total sum
                      function updateTotalSum() {
                        const orderElements =
                          document.querySelectorAll(".orderFood");
                        let totalSum = 0;

                        orderElements.forEach((orderElement) => {
                          const orderText = orderElement.textContent;
                          const match = orderText.match(/₱(\d+)/);
                          if (match) {
                            totalSum += safeParseInt(match[1]);
                          }
                        });

                        const totalSumElement =
                          document.getElementById("totalSum");
                        if (totalSumElement) {
                          totalSumElement.textContent = "Total: ₱" + totalSum;
                        } else {
                          const newTotalSumElement =
                            document.createElement("p");
                          newTotalSumElement.id = "totalSum";
                          newTotalSumElement.textContent =
                            "Total: ₱" + totalSum;
                          document
                            .querySelector(".totaltanan")
                            .appendChild(newTotalSumElement);
                        }
                      }

                      // Update the total sum
                      updateTotalSum();
                    });
                  }
                });
              });

            const containerButton2 = document.createElement("div");
            containerButton2.textContent =
              " If you want to select another category click " +
              " GO BACK BUTTON";
            containerButton2.className = " backbutton";
            chatContainer5.appendChild(containerButton2);
            containerButton2.scrollIntoView();

            const buttonBack2 = document.createElement("button");
            buttonBack2.textContent = "Go back";
            buttonBack2.style.position = "relative";
            buttonBack2.style.top = "0";
            buttonBack2.style.left = "0";
            buttonBack2.style.borderRadius = "20px";
            buttonBack2.style.margin = "40px 0";
            buttonBack2.style.width = "200px";
            containerButton2.appendChild(buttonBack2);

            buttonBack2.addEventListener("click", function () {
              document.getElementById("chatcontainer3").innerHTML = "";
              document.getElementById("chatcontainer4").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer5").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer").scrollIntoView();
            });

            // buttonBack.addEventListener("click", function () {
            //   // Create a new container and set its class name

            //   // Clear the content of other elements
            //   document.getElementById("chatcontainer3").innerHTML = "";

            //   document.querySelector(".container5 button").remove();
            //   // If intending to copy the same content
            //   document.getElementById("chatcontainer4").innerHTML = ""; // Clearing other container
            //   document.getElementById("chatcontainer5").innerHTML = ""; // Clearing other container
            //   document.getElementById("chatcontainer").scrollIntoView();
            // });

            // Using trim() to remove trailing newline
          });
          const orderButton1 = document.querySelector(".button-color2");

          orderButton1.addEventListener("click", function () {
            const messElement = document.createElement("div");
            messElement.textContent = " This is our beverages menu:";
            messElement.className = "message";
            chatContainer3.appendChild(messElement);
            chatContainer3.scrollIntoView();
            let totalSum = 0; // Global variable to keep track of the total price

            fetch("./beverages.json")
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                const products = data.products;

                products.forEach(function (product) {
                  if (product.visible && !product.deleted) {
                    const li = document.createElement("ul");
                    li.innerHTML =
                      '<div class="card mt-1">' +
                      '<div class="product-1 align-items-center p-2 text-center">' +
                      '<img src="' +
                      product.image +
                      '" class="rounded" width="150" height="100" style="margin-top:30px;">' +
                      '<h6 class="mt-4 font-weight-bold mb-2 info">' +
                      product.title +
                      "</h6>" +
                      '<div class="cost mt-1 text-dark"> <span>₱' +
                      product.price +
                      "</span></div>" +
                      '<div class="quantity mt-2">' +
                      '<button class="minus btn btn-danger">-</button>' +
                      '<span class="quantity-number mx-2">0</span>' +
                      '<button class="plus btn btn-success">+</button>' +
                      "</div>" +
                      '<div class="total mt-1 text-dark"><span class="total-price">₱0</span></div>' + // Initial total price set to ₱0
                      "</div>" +
                      '<button class="food-order' +
                      product.code +
                      ' p-2 text-center text-white">' +
                      '<span class="text-uppercase">ORDER NOW</span>' +
                      "</button>";
                    chatContainer4.appendChild(li);

                    const quantityElement =
                      li.querySelector(".quantity-number");
                    const totalPriceElement = li.querySelector(".total-price");
                    const minusButton = li.querySelector(".minus");
                    const plusButton = li.querySelector(".plus");
                    const orderButton = li.querySelector(
                      ".food-order" + product.code
                    );

                    let quantity = 0;
                    let price = parseInt(product.price); // Ensure price is treated as a number

                    // Add event listener to the minus button
                    minusButton.addEventListener("click", function () {
                      if (quantity > 0) {
                        quantity--;
                        quantityElement.textContent = quantity;
                        const newTotalPrice = price * quantity;
                        updateTotalSum(-price);
                        totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                      }
                    });

                    // Add event listener to the plus button
                    plusButton.addEventListener("click", function () {
                      quantity++;
                      quantityElement.textContent = quantity;
                      const newTotalPrice = price * quantity;
                      updateTotalSum(price);
                      totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                    });

                    // Function to update the total sum

                    // Function to safely parse integer

                    // Add event listener to the order button
                    // Add event listener to the order button
                    orderButton.addEventListener("click", function () {
                      const quantity = safeParseInt(
                        li.querySelector(".quantity-number").textContent
                      );
                      const ordersContainer = document.getElementById("orders");

                      if (quantity > 0) {
                        const foodOrderText = `${
                          product.title
                        } x ${quantity} = ₱${price * quantity}`;
                        let foodOrderElement = Array.from(
                          ordersContainer.querySelectorAll(".orderFood")
                        ).find((el) => el.textContent.includes(product.title));

                        if (foodOrderElement) {
                          // Update existing order
                          foodOrderElement.textContent = foodOrderText;
                        } else {
                          // Create new order element
                          foodOrderElement = document.createElement("p");
                          foodOrderElement.textContent = foodOrderText;
                          foodOrderElement.className = "orderFood";
                          ordersContainer.appendChild(foodOrderElement);
                        }
                      } else if (quantity === 0) {
                        // Clear the previous order if quantity is 0
                        const foodOrderElement = Array.from(
                          ordersContainer.querySelectorAll(".orderFood")
                        ).find((el) => el.textContent.includes(product.title));
                        if (foodOrderElement) {
                          foodOrderElement.remove();
                        }
                      }
                      function safeParseInt(value) {
                        const parsed = parseInt(value, 10);
                        return isNaN(parsed) ? 0 : parsed;
                      }

                      // Function to update the total sum
                      function updateTotalSum() {
                        const orderElements =
                          document.querySelectorAll(".orderFood");
                        let totalSum = 0;

                        orderElements.forEach((orderElement) => {
                          const orderText = orderElement.textContent;
                          const match = orderText.match(/₱(\d+)/);
                          if (match) {
                            totalSum += safeParseInt(match[1]);
                          }
                        });

                        const totalSumElement =
                          document.getElementById("totalSum");
                        if (totalSumElement) {
                          totalSumElement.textContent = "Total: ₱" + totalSum;
                        } else {
                          const newTotalSumElement =
                            document.createElement("p");
                          newTotalSumElement.id = "totalSum";
                          newTotalSumElement.textContent =
                            "Total: ₱" + totalSum;
                          document
                            .querySelector(".totaltanan")
                            .appendChild(newTotalSumElement);
                        }
                      }

                      // Update the total sum
                      updateTotalSum();
                    });
                  }
                });
              });

            const containerButton2 = document.createElement("div");
            containerButton2.textContent =
              " If you want to select another category click " +
              " GO BACK BUTTON";
            containerButton2.className = " backbutton";
            chatContainer5.appendChild(containerButton2);
            containerButton2.scrollIntoView();

            const buttonBack2 = document.createElement("button");
            buttonBack2.textContent = "Go back";
            buttonBack2.style.position = "relative";
            buttonBack2.style.top = "0";
            buttonBack2.style.left = "0";
            buttonBack2.style.borderRadius = "20px";
            buttonBack2.style.margin = "40px 0";
            buttonBack2.style.width = "200px";
            containerButton2.appendChild(buttonBack2);

            buttonBack2.addEventListener("click", function () {
              document.getElementById("chatcontainer3").innerHTML = "";
              document.getElementById("chatcontainer4").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer5").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer").scrollIntoView();
            });
          });

          //
          //   // Using trim() to remove trailing newline

          const orderButton2 = document.querySelector(".button-color3");

          orderButton2.addEventListener("click", function () {
            const messElement = document.createElement("div");
            messElement.textContent = " This is our snacks menu:";
            messElement.className = "message";
            chatContainer3.appendChild(messElement);
            chatContainer3.scrollIntoView();

             let totalSum = 0; // Global variable to keep track of the total price

             fetch("./snacks.json")
               .then(function (response) {
                 return response.json();
               })
               .then(function (data) {
                 const products = data.products;

                 products.forEach(function (product) {
                   if (product.visible && !product.deleted) {
                     const li = document.createElement("ul");
                     li.innerHTML =
                       '<div class="card mt-1">' +
                       '<div class="product-1 align-items-center p-2 text-center">' +
                       '<img src="' +
                       product.image +
                       '" class="rounded" width="150" height="100" style="margin-top:30px;">' +
                       '<h6 class="mt-4 font-weight-bold mb-2 info">' +
                       product.title +
                       "</h6>" +
                       '<div class="cost mt-1 text-dark"> <span>₱' +
                       product.price +
                       "</span></div>" +
                       '<div class="quantity mt-2">' +
                       '<button class="minus btn btn-danger">-</button>' +
                       '<span class="quantity-number mx-2">0</span>' +
                       '<button class="plus btn btn-success">+</button>' +
                       "</div>" +
                       '<div class="total mt-1 text-dark"><span class="total-price">₱0</span></div>' + // Initial total price set to ₱0
                       "</div>" +
                       '<button class="food-order' +
                       product.code +
                       ' p-2 text-center text-white">' +
                       '<span class="text-uppercase">ORDER NOW</span>' +
                       "</button>";
                     chatContainer4.appendChild(li);

                     const quantityElement =
                       li.querySelector(".quantity-number");
                     const totalPriceElement = li.querySelector(".total-price");
                     const minusButton = li.querySelector(".minus");
                     const plusButton = li.querySelector(".plus");
                     const orderButton = li.querySelector(
                       ".food-order" + product.code
                     );

                     let quantity = 0;
                     let price = parseInt(product.price); // Ensure price is treated as a number

                     // Add event listener to the minus button
                     minusButton.addEventListener("click", function () {
                       if (quantity > 0) {
                         quantity--;
                         quantityElement.textContent = quantity;
                         const newTotalPrice = price * quantity;
                         updateTotalSum(-price);
                         totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                       }
                     });

                     // Add event listener to the plus button
                     plusButton.addEventListener("click", function () {
                       quantity++;
                       quantityElement.textContent = quantity;
                       const newTotalPrice = price * quantity;
                       updateTotalSum(price);
                       totalPriceElement.textContent = "₱" + newTotalPrice; // Update total price display
                     });

                     // Function to update the total sum

                     // Function to safely parse integer

                     // Add event listener to the order button
                     // Add event listener to the order button
                     orderButton.addEventListener("click", function () {
                       const quantity = safeParseInt(
                         li.querySelector(".quantity-number").textContent
                       );
                       const ordersContainer =
                         document.getElementById("orders");

                       if (quantity > 0) {
                         const foodOrderText = `${
                           product.title
                         } x ${quantity} = ₱${price * quantity}`;
                         let foodOrderElement = Array.from(
                           ordersContainer.querySelectorAll(".orderFood")
                         ).find((el) => el.textContent.includes(product.title));

                         if (foodOrderElement) {
                           // Update existing order
                           foodOrderElement.textContent = foodOrderText;
                         } else {
                           // Create new order element
                           foodOrderElement = document.createElement("p");
                           foodOrderElement.textContent = foodOrderText;
                           foodOrderElement.className = "orderFood";
                           ordersContainer.appendChild(foodOrderElement);
                         }
                       } else if (quantity === 0) {
                         // Clear the previous order if quantity is 0
                         const foodOrderElement = Array.from(
                           ordersContainer.querySelectorAll(".orderFood")
                         ).find((el) => el.textContent.includes(product.title));
                         if (foodOrderElement) {
                           foodOrderElement.remove();
                         }
                       }
                       function safeParseInt(value) {
                         const parsed = parseInt(value, 10);
                         return isNaN(parsed) ? 0 : parsed;
                       }

                       // Function to update the total sum
                       function updateTotalSum() {
                         const orderElements =
                           document.querySelectorAll(".orderFood");
                         let totalSum = 0;

                         orderElements.forEach((orderElement) => {
                           const orderText = orderElement.textContent;
                           const match = orderText.match(/₱(\d+)/);
                           if (match) {
                             totalSum += safeParseInt(match[1]);
                           }
                         });

                         const totalSumElement =
                           document.getElementById("totalSum");
                         if (totalSumElement) {
                           totalSumElement.textContent = "Total: ₱" + totalSum;
                         } else {
                           const newTotalSumElement =
                             document.createElement("p");
                           newTotalSumElement.id = "totalSum";
                           newTotalSumElement.textContent =
                             "Total: ₱" + totalSum;
                           document
                             .querySelector(".totaltanan")
                             .appendChild(newTotalSumElement);
                         }
                       }

                       // Update the total sum
                       updateTotalSum();
                     });
                   }
                 });
               });


            const containerButton2 = document.createElement("div");
            containerButton2.textContent =
              " If you want to select another category click " +
              " GO BACK BUTTON";
            containerButton2.className = " backbutton";
            chatContainer5.appendChild(containerButton2);
            containerButton2.scrollIntoView();

            const buttonBack2 = document.createElement("button");
            buttonBack2.textContent = "Go back";
            buttonBack2.style.position = "relative";
            buttonBack2.style.top = "0";
            buttonBack2.style.left = "0";
            buttonBack2.style.borderRadius = "20px";
            buttonBack2.style.margin = "40px 0";
            buttonBack2.style.width = "200px";
            containerButton2.appendChild(buttonBack2);

            buttonBack2.addEventListener("click", function () {
              document.getElementById("chatcontainer3").innerHTML = "";
              document.getElementById("chatcontainer4").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer5").innerHTML = ""; // Clearing other container
              document.getElementById("chatcontainer").scrollIntoView();
            });
          });

          //
          //   // Using trim() to remove trailing newline
        });

      // Using trim() to remove trailing newline
    }
    const placeOrder = document.getElementById("toggle");
    placeOrder.addEventListener("click", function () {
      const orderCheckout = document.querySelector(".cart").innerHTML;
    });
    // Function to add and update order summary
  } else {
    const continueElementNo = document.createElement("div");
    continueElementNo.textContent = " Back to Main Menu.";
    continueElementNo.style.border = "2px solid black";
    continueElementNo.style.width = "200px";
    continueElementNo.style.textAlign = "center";
    continueElementNo.style.borderRadius = "20px";
    continueElementNo.style.borderBottomLeftRadius = "0";
    continueElementNo.style.height = "40px";
    chatContainer2.appendChild(continueElementNo);
  }

  // Scroll to the bottom of the chat window
  chatWindow.scrollTop;
}
