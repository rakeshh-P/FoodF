const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');



function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addUnsplashParams(url) {
  if (!url) return url;
  if (url.includes('?')) return url + '&auto=format&fit=crop&w=600&q=80';
  return url + '?auto=format&fit=crop&w=600&q=80';
}

const restaurants = [
  // Bella Vista Italian Bistro
  {
    name: "Bella Vista Italian Bistro",
    description: "Italian cuisine in Downtown Manhattan, NY",
    address: "456 Mulberry Street, New York, NY 10012",
    phone: "(212) 555-1001",
    supportsCOD: true,
    supportsMobilePayment: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    menu: [
      {
        name: "Margherita Pizza",
        description: "Traditional Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil",
        price: 18.95,
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
      },
      {
        name: "Osso Buco Milanese",
        description: "Braised veal shanks with vegetables, white wine, and broth, served with risotto",
        price: 34.95,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
      },
      {
        name: "Burrata Caprese",
        description: "Creamy burrata cheese with heirloom tomatoes, fresh basil, and balsamic reduction",
        price: 16.75,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500"
      },
      {
        name: "Tiramisu",
        description: "Traditional Italian dessert with ladyfingers, mascarpone, coffee, and cocoa",
        price: 12.95,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
      },
      {
        name: "Seafood Risotto",
        description: "Creamy Arborio rice with mixed seafood, white wine, and saffron",
        price: 28.95,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500"
      },
      {
        name: "Penne Arrabbiata",
        description: "Spicy pasta with tomatoes, garlic, red chili peppers, and fresh herbs",
        price: 19.75,
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500"
      },
      {
        name: "Gelato Trio",
        description: "Three scoops of house-made gelato: vanilla, chocolate, and pistachio",
        price: 9.95,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500"
      }
    ]
  },
  // Tokyo Sakura Sushi Bar
  {
    name: "Tokyo Sakura Sushi Bar",
    description: "Japanese cuisine in Little Tokyo, Los Angeles, CA",
    address: "123 East 1st Street, Los Angeles, CA 90012",
    phone: "(213) 555-2002",
    supportsCOD: true,
    supportsMobilePayment: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
    menu: [
      {
        name: "Omakase Chef's Selection",
        description: "12-piece chef's choice sushi and sashimi selection with seasonal specialties",
        price: 85.00,
        category: "Sushi Set",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500"
      },
      {
        name: "Dragon Roll",
        description: "Eel and cucumber inside, avocado on top with eel sauce and sesame seeds",
        price: 16.95,
        category: "Specialty Roll",
        image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500"
      },
      {
        name: "Chirashi Bowl",
        description: "Assorted sashimi over seasoned sushi rice with pickled vegetables",
        price: 24.50,
        category: "Rice Bowl",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500"
      },
      {
        name: "Tempura Udon",
        description: "Thick wheat noodles in dashi broth with assorted tempura vegetables and shrimp",
        price: 18.75,
        category: "Noodles",
        image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=500"
      },
      {
        name: "Salmon Teriyaki",
        description: "Grilled Atlantic salmon with house-made teriyaki glaze and steamed vegetables",
        price: 26.95,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500"
      },
      {
        name: "Gyoza Dumplings",
        description: "Pan-fried pork and vegetable dumplings served with dipping sauce",
        price: 8.95,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500"
      },
      {
        name: "Spicy Tuna Roll",
        description: "Fresh tuna with spicy mayo, cucumber, and scallions rolled in nori and rice",
        price: 12.50,
        category: "Sushi Roll",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500"
      },
      {
        name: "Mochi Ice Cream",
        description: "Sweet rice cake filled with premium ice cream - green tea, red bean, and mango",
        price: 7.95,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
      }
    ]
  },
  
  // Spice Route Indian Kitchen
  {
    name: "Spice Route Indian Kitchen",
    description: "Indian cuisine in Curry Hill, New York, NY",
    address: "321 Lexington Avenue, New York, NY 10016",
    phone: "(212) 555-1234",
    supportsCOD: true,
    supportsMobilePayment: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
    menu: [
      {
        name: "Chicken Tikka Masala",
        description: "Tender chicken in creamy tomato-based curry with aromatic spices",
        price: 16.95,
        category: "Chicken",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
      },
      {
        name: "Palak Paneer",
        description: "Fresh spinach curry with homemade cottage cheese and traditional spices",
        price: 14.50,
        category: "Vegetarian",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
      },
      {
        name: "Samosa Chaat",
        description: "Crispy samosas topped with chickpeas, yogurt, chutneys, and spices",
        price: 8.95,
        category: "Appetizer",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500"
      },
      {
        name: "Tandoori Mixed Grill",
        description: "Assorted meats marinated in yogurt and spices, cooked in clay oven",
        price: 24.95,
        category: "Tandoori",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500"
      },
      {
        name: "Dal Makhani",
        description: "Slow-cooked black lentils in rich tomato and butter sauce",
        price: 12.95,
        category: "Lentils",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
      },
      {
        name: "Fish Curry Kerala Style",
        description: "Fresh fish in coconut milk curry with curry leaves and spices",
        price: 19.50,
        category: "Seafood",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500"
      },
      {
        name: "Naan Bread Basket",
        description: "Assorted freshly baked naan breads: plain, garlic, and butter",
        price: 7.95,
        category: "Bread",
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500"
      },
      {
        name: "Gulab Jamun",
        description: "Golden fried milk dumplings soaked in rose-cardamom syrup",
        price: 6.95,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500"
      }
    ]
  },
  // El Corazón Mexican Cantina
  {
    name: "El Corazón Mexican Cantina",
    description: "Mexican cuisine in Mission District, San Francisco, CA",
    address: "654 Mission Street, San Francisco, CA 94105",
    phone: "(415) 555-3003",
    supportsCOD: true,
    supportsMobilePayment: false,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    menu: [
      {
        name: "Carnitas Tacos",
        description: "Slow-cooked pork shoulder with onions, cilantro, and salsa verde on corn tortillas",
        price: 12.95,
        category: "Tacos",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500"
      },
      {
        name: "Chicken Enchiladas Verdes",
        description: "Three corn tortillas filled with chicken, topped with green tomatillo sauce and cheese",
        price: 15.50,
        category: "Enchiladas",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500"
      },
      // {
      //   name: "Guacamole & Chips",
      //   description: "Fresh avocado dip with lime, cilantro, and jalapeños served with tortilla chips",
      //   price: 9.95,
      //   category: "Appetizer",
      //   image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500"
      // },
      {
        name: "Carne Asada Burrito",
        description: "Grilled steak with rice, beans, cheese, salsa, and sour cream in flour tortilla",
        price: 13.95,
        category: "Burritos",
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500"
      },
      // {
      //   name: "Chiles Rellenos",
      //   description: "Roasted poblano peppers stuffed with cheese, battered and fried",
      //   price: 16.75,
      //   category: "Main Course",
      //   image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500"
      // }
    ]
  },
  // Maharaja Palace
  {
    name: "Maharaja Palace",
    description: "North Indian cuisine in Punjabi Bagh, New Delhi",
    address: "Block A, Punjabi Bagh West, New Delhi 110026",
    phone: "+91 11 5555 4004",
    supportsCOD: true,
    supportsMobilePayment: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500",
    menu: [
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces, finished with butter and cream",
        price: 450.00,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500"
      },
      {
        name: "Paneer Tikka Masala",
        description: "Marinated cottage cheese cubes in rich onion-tomato gravy with aromatic spices",
        price: 380.00,
        category: "Vegetarian",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
      },
      {
        name: "Tandoori Roti",
        description: "Whole wheat flatbread cooked in traditional clay oven, served hot with butter",
        price: 45.00,
        category: "Bread",
        image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=500"
      },
      {
        name: "Rajasthani Dal Baati",
        description: "Traditional baked wheat balls served with mixed lentil curry and ghee",
        price: 320.00,
        category: "Traditional",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500"
      },
      {
        name: "Kulfi Falooda",
        description: "Traditional Indian ice cream with vermicelli, rose syrup, and nuts",
        price: 180.00,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
      }
    ]
  },
  // Spice Palace
  {
    name: "Spice Palace",
    description: "Authentic North Indian cuisine with traditional tandoor specialties",
    address: "Mumbai, Maharashtra",
    phone: "+91 22 5555 5005",
    supportsCOD: false,
    supportsMobilePayment: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    menu: [
      {
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces and aromatic spices",
        price: 450,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      // {
      //   name: "Chicken Biryani",
      //   description: "Fragrant basmati rice layered with spiced chicken and garnished with fried onions",
      //   price: 520,
      //   category: "Rice & Biryani",
      //   image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      // },
      {
        name: "Tandoori Chicken",
        description: "Clay oven roasted chicken marinated in yogurt and traditional spices",
        price: 380,
        category: "Tandoori",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      {
        name: "Palak Paneer",
        description: "Fresh spinach curry with cottage cheese cubes in a creamy base",
        price: 320,
        category: "Vegetarian Main Course",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      },
      // {
      //   name: "Garlic Naan",
      //   description: "Fresh baked bread topped with garlic and herbs from tandoor oven",
      //   price: 80,
      //   category: "Bread",
      //   image: "https://images.unsplash.com/photo-1619221708387-f6f5d6dd6771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      // }
    ]
  },
  // Hard Rock Cafe
  // {
  //   name: "Hard Rock Cafe",
  //   description: "American cuisine and live music bar",
  //   address: "St. Marks Road, Bengaluru",
  //   phone: "+91 80 5555 6006",
  //   supportsCOD: true,
  //   supportsMobilePayment: false,
  //   image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  //   menu: [
  //     {
  //       name: "Classic Burger",
  //       description: "Grilled beef patty with cheddar, lettuce, tomato, and onion",
  //       price: 450,
  //       category: "Burger",
  //       image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500"
  //     },
  //     {
  //       name: "BBQ Ribs",
  //       description: "Slow-cooked pork ribs glazed in BBQ sauce",
  //       price: 600,
  //       category: "Main Course",
  //       image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500"
  //     },
  //     {
  //       name: "Caesar Salad",
  //       description: "Romaine lettuce, Caesar dressing, croutons, and parmesan cheese",
  //       price: 300,
  //       category: "Salad",
  //       image: "https://images.unsplash.com/photo-1589308078054-8328bdec33cd?w=500"
  //     },
  //     {
  //       name: "Buffalo Wings",
  //       description: "Spicy chicken wings served with blue cheese dip",
  //       price: 350,
  //       category: "Appetizer",
  //       image: "https://images.unsplash.com/photo-1606788075760-25e6c8d90c1a?w=500"
  //     },
  //     {
  //       name: "Chocolate Milkshake",
  //       description: "Classic creamy chocolate shake topped with whipped cream",
  //       price: 250,
  //       category: "Beverage",
  //       image: "https://images.unsplash.com/photo-1589220217521-54053aa3f4f4?w=500"
  //     }
  //   ]
  // },
  
    {
      "name": "Nagarjuna",
      "description": "Authentic Andhra style cuisine, famous for its spicy preparations and traditional banana leaf meals.",
      "address": "44/1, Residency Road, Bengaluru, Karnataka 560025, India",
      "phone": "+91 80 5555 7007",
      "supportsCOD": true,
      "supportsMobilePayment": true,
      "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "menu": [
        {
          "name": "Andhra Chicken Curry",
          "description": "A fiery and aromatic chicken curry made with a special blend of Guntur spices and a tomato-onion gravy.",
          "price": 350,
          "category": "Main Course",
          "image": "https://images.unsplash.com/photo-1604329226345-2d9050bb4bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Mutton Biryani",
          "description": "Spicy and flavorful biryani cooked with tender mutton pieces, fragrant basmati rice, and traditional Andhra spices.",
          "price": 450,
          "category": "Biryani",
          "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Gutti Vankaya Kura",
          "description": "A traditional Andhra dish of stuffed eggplants cooked in a rich and nutty gravy made with peanuts, coconut, and spices.",
          "price": 280,
          "category": "Vegetarian Main",
          "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Prawn Fry",
          "description": "Fresh prawns marinated in a spicy masala blend of ginger, garlic, and red chilies, then shallow-fried until crisp.",
          "price": 400,
          "category": "Appetizer",
          "image": "https://images.unsplash.com/photo-1625535336825-6905cb3d4bde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Nellore Fish Curry",
          "description": "A tangy and spicy fish curry from the Nellore region, made with a tamarind base and freshly ground spices.",
          "price": 380,
          "category": "Main Course",
          "image": "https://images.unsplash.com/photo-1574484284001-7c5b9e0b1d3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        }
      ]
    },
    {
      "name": "Palamuru Grill",
      "description": "A popular destination for authentic Telangana cuisine, known for its rustic flavors and spicy meat dishes.",
      "address": "Ayyappa Society, Madhapur, Hyderabad, Telangana 500081, India",
      "phone": "+91 40 5555 8008",
      "supportsCOD": true,
      "supportsMobilePayment": false,
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "menu": [
        {
          "name": "Telangana Kodi Kura",
          "description": "A traditional Telangana-style chicken curry with a rich, spicy gravy and a unique blend of local spices.",
          "price": 320,
          "category": "Main Course",
          "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Mamsam Pulusu",
          "description": "A tangy and spicy mutton curry cooked with tamarind pulp and a host of aromatic spices, a Telangana specialty.",
          "price": 420,
          "category": "Main Course",
          "image": "https://images.unsplash.com/photo-1628209215993-272a233c46e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Nalli Ghost Biryani",
          "description": "A slow-cooked biryani featuring succulent lamb shanks (nalli), fragrant basmati rice, and a blend of Telangana spices.",
          "price": 480,
          "category": "Biryani",
          "image": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Jonna Rotte",
          "description": "Healthy and traditional flatbread made from sorghum flour (jowar), a staple in Telangana households.",
          "price": 60,
          "category": "Bread",
          "image": "https://images.unsplash.com/photo-1626702636598-a69623832c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Pachi Pulusu",
          "description": "A refreshing and tangy raw tamarind soup with onions, chilies, and coriander, a unique uncooked Telangana specialty.",
          "price": 120,
          "category": "Soup",
          "image": "https://images.unsplash.com/photo-1547592180-85f1d35a802c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Talakaya Kura",
          "description": "A delicacy for the adventurous, this is a spicy curry made from a lamb's head, cooked with rich local spices.",
          "price": 380,
          "category": "Exotic",
          "image": "https://images.unsplash.com/photo-1599547521467-3b34279a83fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
      ]
    },
    // {
    //   "name": "Indian Accent",
    //   "description": "A critically acclaimed restaurant offering a unique take on contemporary Indian cuisine, blending global ingredients with traditional flavors.",
    //   "address": "The Lodhi, Lodhi Rd, CGO Complex, Pragati Vihar, New Delhi, Delhi 110003, India",
    //   "phone": "+91 11 5555 9009",
    //   "supportsCOD": false,
    //   "supportsMobilePayment": true,
    //   "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    //   "menu": [
    //     {
    //       "name": "Meetha Achaar Pork Ribs",
    //       "description": "Tender pork ribs glazed with a sweet and sour mango pickle, served with sundried mango and toasted kalonji seeds.",
    //       "price": 2200,
    //       "category": "Main Course",
    //       "image": "https://images.unsplash.com/photo-1634818276927-22b6b3b28b4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    //     },
    //     {
    //       "name": "Kashmiri Morel Musallam",
    //       "description": "Exotic Kashmiri morels cooked in a rich, creamy gravy with a hint of saffron and traditional spices, a vegetarian delight.",
    //       "price": 1950,
    //       "category": "Vegetarian Main",
    //       "image": "https://images.unsplash.com/photo-1628139394539-77c171963b6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    //     },
    //     {
    //       "name": "Blue Cheese Naan",
    //       "description": "A creative twist on the classic naan, stuffed with pungent blue cheese and served warm and fluffy from the tandoor.",
    //       "price": 550,
    //       "category": "Bread",
    //       "image": "https://images.unsplash.com/photo-1628198797932-781d4a3501a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    //     },
    //     {
    //       "name": "Daulat Ki Chaat",
    //       "description": "An ethereal and light dessert from Old Delhi, a frothy milk-based sweet garnished with saffron, pistachios, and silver leaf.",
    //       "price": 850,
    //       "category": "Dessert",
    //       "image": "https://images.unsplash.com/photo-1582590013355-620941197825?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    //     },
    //     {
    //       "name": "Ghee Roast Soy Boti",
    //       "description": "A vegetarian take on a classic, with soy chunks marinated in a fiery ghee roast masala and grilled to perfection.",
    //       "price": 1650,
    //       "category": "Appetizer",
    //       "image": "https://images.unsplash.com/photo-1626776871329-3c721d7a346e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    //     }
    //   ]
    // },
    {
      "name": "Truffles",
      "description": "An iconic Bengaluru institution famous for its juicy burgers, hearty American comfort food, and vibrant, youthful atmosphere.",
      "address": "28, St Mark's Road, Bengaluru, Karnataka 560001, India",
      "phone": "+91 80 5555 1010",
      "supportsCOD": true,
      "supportsMobilePayment": true,
      "image": "https://images.unsplash.com/photo-1508615039623-a25605d2b022?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "menu": [
        {
          "name": "All American Cheeseburger",
          "description": "A signature burger with a juicy minced beef patty, melted cheddar cheese, lettuce, tomatoes, and a special sauce in a soft bun.",
          "price": 280,
          "category": "Burgers",
          "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1098&q=80"
        },
        {
          "name": "Peri-Peri Chicken Steak",
          "description": "A succulent chicken steak grilled to perfection and topped with a fiery peri-peri sauce, served with fries and coleslaw.",
          "price": 380,
          "category": "Steaks",
          "image": "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Ferrero Rocher Milkshake",
          "description": "A thick and creamy milkshake blended with Ferrero Rocher chocolates, topped with whipped cream.",
          "price": 220,
          "category": "Beverages",
          "image": "https://images.unsplash.com/photo-1572490122747-91a039a3b6e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Spaghetti Carbonara",
          "description": "Classic Italian pasta with creamy egg sauce, bacon, and a generous sprinkle of Parmesan cheese.",
          "price": 350,
          "category": "Pasta",
          "image": "https://images.unsplash.com/photo-1588013273468-411962b219e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Cajun Fried Chicken Burger",
          "description": "A crispy fried chicken patty seasoned with bold Cajun spices, served with lettuce, tomato, and a spicy mayo.",
          "price": 300,
          "category": "Burgers",
          "image": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
        }
      ]
    },
    {
      "name": "Chili's Grill & Bar",
      "description": "A leading American casual dining restaurant, offering a fun and energetic atmosphere with a menu of classic Tex-Mex and American favorites.",
      "address": "Orion Mall, Dr. Rajkumar Road, Malleshwaram West, Bengaluru, Karnataka 560055, India",
      "phone": "+91 80 5555 1111",
      "supportsCOD": false,
      "supportsMobilePayment": true,
      "image": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "menu": [
        {
          "name": "Baby Back Ribs",
          "description": "Slow-smoked, fall-off-the-bone pork ribs smothered in classic BBQ sauce, served with fries and corn on the cob.",
          "price": 1600,
          "category": "Main Course",
          "image": "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
        },
        {
          "name": "Sizzling Fajitas",
          "description": "Your choice of grilled chicken or paneer on a sizzling skillet with onions and bell peppers, with tortillas and toppings.",
          "price": 550,
          "category": "Tex-Mex",
          "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eBF49b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Molten Chocolate Cake",
          "description": "A warm chocolate cake with a molten chocolate center, topped with vanilla ice cream under a hard chocolate shell.",
          "price": 375,
          "category": "Dessert",
          "image": "https://images.unsplash.com/photo-1586985289936-e04c07049d94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        },
        {
          "name": "Loaded Boneless Wings",
          "description": "Tender boneless wings tossed in a spicy sauce and topped with melted cheese, bacon, and green onions.",
          "price": 450,
          "category": "Appetizer",
          "image": "https://images.unsplash.com/photo-1598514983318-7613c5fb8da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
          "name": "Classic Nachos",
          "description": "A mountain of crispy tortilla chips topped with melted cheese, jalapeños, beans, queso, and a hint of seasoned beef.",
          "price": 400,
          "category": "Appetizer",
          "image": "https://images.unsplash.com/photo-1598439243058-a55d2f623340?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
        }
      ]
    },
    // Prime Steakhouse & Grill
    {
      name: "Prime Steakhouse & Grill",
      description: "Upscale American steakhouse featuring premium USDA Prime cuts, fresh seafood, and an extensive wine collection in an elegant atmosphere",
      address: "1247 Broadway Street, New York, NY 10001",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
      menu: [
        {
          name: "Prime Ribeye Steak",
          description: "28-day dry-aged USDA Prime ribeye (16oz) with garlic herb butter, served with choice of potato and seasonal vegetables",
          price: 68.00,
          category: "Steaks",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Maine Lobster Tail",
          description: "Twin cold-water lobster tails (8oz each) broiled with lemon herb butter, served with drawn butter and lemon",
          price: 54.00,
          category: "Seafood",
          image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523c?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Wagyu Beef Burger",
          description: "8oz American Wagyu patty with aged cheddar, applewood bacon, caramelized onions, and truffle aioli on brioche bun",
          price: 32.00,
          category: "Burgers",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Classic Caesar Salad",
          description: "Crisp romaine lettuce, house-made croutons, aged parmesan, and traditional Caesar dressing",
          price: 16.00,
          category: "Salads",
          image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Truffle Mac & Cheese",
          description: "Four-cheese blend with black truffle oil, topped with herb breadcrumbs and baked until golden",
          price: 22.00,
          category: "Sides",
          image: "https://images.unsplash.com/photo-1543826173-1ad734f4d3e3?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Molten Chocolate Lava Cake",
          description: "Warm Belgian chocolate cake with molten center, served with vanilla bean ice cream and fresh berries",
          price: 14.00,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1920&q=80"
        }
      ]
    },
    // Southern Comfort Kitchen
    {
      name: "Southern Comfort Kitchen",
      description: "Authentic Southern comfort food with a modern twist, featuring house-smoked meats, fresh cornbread, and traditional sides",
      address: "892 Peachtree Street, Atlanta, GA 30309",
      phone: "+91 80 6555 1212",
      supportsCOD: true,
      supportsMobilePayment: false,
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1920&q=80",
      menu: [
        {
          name: "Buttermilk Fried Chicken",
          description: "Half chicken marinated in buttermilk, hand-breaded and fried to golden perfection, served with honey hot sauce",
          price: 18.00,
          category: "Main Course",
          image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Hickory Smoked BBQ Ribs",
          description: "Full rack of St. Louis ribs slow-smoked for 12 hours with hickory wood, glazed with house BBQ sauce",
          price: 28.00,
          category: "BBQ",
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Shrimp & Grits",
          description: "Creamy stone-ground grits topped with Gulf shrimp, andouille sausage, and Creole cream sauce",
          price: 24.00,
          category: "Southern Classics",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Fried Catfish Po' Boy",
          description: "Cornmeal-crusted catfish on French bread with lettuce, tomato, pickles, and remoulade sauce",
          price: 16.00,
          category: "Sandwiches",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Brisket Mac & Cheese",
          description: "House-smoked brisket over three-cheese mac and cheese, topped with crispy onions and BBQ drizzle",
          price: 19.00,
          category: "Comfort Food",
          image: "https://images.unsplash.com/photo-1543826173-1ad734f4d3e3?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Cast Iron Cornbread",
          description: "Warm cornbread baked in cast iron skillet, served with whipped honey butter",
          price: 8.00,
          category: "Sides",
          image: "https://images.unsplash.com/photo-1587132117446-a4139465fb21?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Georgia Peach Cobbler",
          description: "Fresh Georgia peaches with cinnamon crumble topping, served warm with vanilla ice cream",
          price: 12.00,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1920&q=80"
        }
      ]
    },
    // West Coast Burger Co.
    {
      name: "West Coast Burger Co.",
      description: "California-style gourmet burgers made with locally sourced ingredients, craft beer, and fresh-cut fries",
      address: "2156 Sunset Boulevard, Los Angeles, CA 90026",
      phone: "+91 80 5555 1132",
      supportsCOD: true,
      supportsMobilePayment: false,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80",
      menu: [
        {
          name: "California Classic Burger",
          description: "Grass-fed beef patty with avocado, sprouts, tomato, red onion, and chipotle aioli on artisan brioche",
          price: 16.00,
          category: "Burgers",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Turkey Avocado Burger",
          description: "Lean ground turkey patty with fresh avocado, spinach, tomato, and herb mayo on whole wheat bun",
          price: 15.00,
          category: "Healthy Options",
          image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Impossible Burger",
          description: "Plant-based Impossible patty with vegan cheese, lettuce, tomato, pickles, and special sauce",
          price: 17.00,
          category: "Plant-Based",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Sweet Potato Fries",
          description: "Hand-cut sweet potato fries with sea salt and rosemary, served with sriracha aioli",
          price: 9.00,
          category: "Sides",
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Truffle Parmesan Fries",
          description: "Crispy fries tossed with truffle oil, fresh parmesan, and herbs",
          price: 12.00,
          category: "Sides",
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Craft Beer Float",
          description: "Local IPA with vanilla ice cream and caramel drizzle",
          price: 11.00,
          category: "Beverages",
          image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=1920&q=80"
        }
      ]
    },
    // Chicago Deep Dish Pizza Co.
    {
      name: "Chicago Deep Dish Pizza Co.",
      description: "Authentic Chicago-style deep dish pizza with thick crust, chunky tomato sauce, and premium toppings",
      address: "1847 North Wells Street, Chicago, IL 60614",
      phone: "+91 80 5555 1132",
      supportsCOD: true,
      supportsMobilePayment: false,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80",
      menu: [
        {
          name: "Classic Deep Dish Pizza",
          description: "Traditional Chicago deep dish with Italian sausage, mozzarella, and chunky tomato sauce (serves 2-3)",
          price: 24.00,
          category: "Deep Dish Pizza",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Meat Lovers Deep Dish",
          description: "Loaded with pepperoni, Italian sausage, ground beef, and bacon in our signature deep dish crust",
          price: 28.00,
          category: "Deep Dish Pizza",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Veggie Supreme Deep Dish",
          description: "Fresh vegetables including bell peppers, mushrooms, onions, tomatoes, and olives",
          price: 22.00,
          category: "Deep Dish Pizza",
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Chicago Thin Crust Pizza",
          description: "Crispy tavern-style thin crust cut into squares, topped with sausage and pepperoni",
          price: 18.00,
          category: "Thin Crust Pizza",
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Chicago-Style Buffalo Wings",
          description: "Crispy wings tossed in spicy buffalo sauce, served with celery and blue cheese dressing",
          price: 14.00,
          category: "Appetizers",
          image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Italian Beef Sandwich",
          description: "Thin-sliced seasoned beef with hot giardiniera and sweet peppers on Italian bread",
          price: 13.00,
          category: "Sandwiches",
          image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80"
        },
        {
          name: "Chocolate Chip Cookie Pizza",
          description: "Warm chocolate chip cookie pizza topped with vanilla ice cream and chocolate drizzle",
          price: 16.00,
          category: "Desserts",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1920&q=80"
        }
      ]
    }
  
];

const testUser = {
    username: "testuser",
    password: "password123"
};


let imgIdx = 0;
restaurants.forEach(r => {
  r.image = addUnsplashParams(r.image);
  r.menu.forEach(m => {
    if (!m.image) {
      m.image = foodImages[imgIdx % foodImages.length];
      imgIdx++;
    }
  });
});

// NOTE FOR FRONTEND: For best performance, use lazy loading for images in the menu and restaurant list views.

module.exports = {
    restaurants,
    testUser
}; 