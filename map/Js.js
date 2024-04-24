
    mapboxgl.accessToken = 'pk.eyJ1Ijoiemhla3NlbWJhZXYiLCJhIjoiY2x1amx5ODduMGV3cTJrbG1mM20xbGdpYyJ9.wI0m-1zZpcXOFrNBgjenjQ';

    var stores = [
        { 
            name: 'Mega SilkWay',
            address: 'Проспект Кабанбай батыр, 62',
            description: 'MEGA Silk Way — это новая глава для сети торгово-развлекательных центров MEGA. MEGA Silk Way — важный объект с точки зрения туристической и инвестиционной привлекательности столицы, который сочетает в себе лучшие качества проектов сети MEGA.',
            images: ['Mega.jpg', 'Mega2.jpeg', 'Mega3.jpg'],
            coordinates: [71.408, 51.089]
        },
        { 
            name: 'Keruen',
            address: 'Улица Достык, 9',
            description: 'Для всех посетителей ТРЦ «Керуен» предоставлен бесплатный Wi-Fi на 3-ем этаже (фудкорт), комната матери и ребенка, намазхана, велостоянка, стоянка для самокатов, детские стулья для кормления. Главной идеей дизайн-проекта является Великий Шелковый Путь.',
            images: ['Keruen.jpg', 'Keruen2.jpg', 'Keruen3.jpg'],
            coordinates: [71.424311, 51.128206]
        },
        { 
            name: 'Khan-Shatyr',
            address: 'Проспект Туран, 37',
            description: 'ТРЦ "Хан Шатыр" считается первым центром формирования образа жизни, это здание, открытое 6 июля 2010 года, приурочено к 12-летию столицы Казахстана. Высота Хан Шатыра - 150 м и прозрачная крыша общей площадью 127 000 м², 6 этажей. В паркинге - 700 мест на автомобиль.',
            images: ['Shatyr.jpg', 'Shatyr2.jpg', 'Shatyr3.jpg'],
            coordinates: [71.402936, 51.131669]
        }
    ];

    var shops = [
        { 
            name: 'Zara',
            address: 'Zara - это мировой лидер в области моды быстрой доставки. Считается, что Zara создаёт тренды, а не просто следует за ними',
            images: ['zara.jpg', 'Mega2.jpeg', 'Mega3.jpg'],
        },
        { 
            name: 'LCW',
            address: 'LCW (LC Waikiki) - это ваш личный стильный проводник в мире моды. Входя в их магазин, вы погружаетесь в атмосферу  стиля и уюта',
            images: ['LCW.png', 'Keruen2.jpg', 'Keruen3.jpg'],
        },
        { 
            name: 'Kimex',
            address: 'Kimex - это ваш надежный партнёр в создании уюта и стиля в вашем доме. Шагая в их магазин.',
            images: ['Kimwx.png', 'Shatyr2.jpg', 'Shatyr3.jpg'],
        }
    ];

    var map;

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
        enableHighAccuracy: true
    });

    function successLocation(position) {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [position.coords.longitude, position.coords.latitude],
            zoom: 16
        });

        stores.forEach(function(store) {
        // Очистить carousel-inner перед добавлением изображений для каждого магазина
        document.querySelector('.carousel-inner').innerHTML = '';
    
        store.images.forEach(function(image, imgIndex) {
            var carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item' + (imgIndex === 1 ? ' active' : '');
    
            var carouselImage = `<img src="${image}" class="d-block w-100" alt="${store.name}" style = "width: 100px; height: 200px;">`;
            carouselItem.innerHTML = carouselImage;
    
            document.querySelector('.carousel-inner').appendChild(carouselItem);
        });
    });

    stores.forEach(function(store) {
        var marker = new mapboxgl.Marker()
            .setLngLat(store.coordinates)
            .addTo(map);

        marker.getElement().addEventListener('click', function() {
            map.flyTo({ center: store.coordinates });

            document.getElementById('store-info').innerHTML = `
                <div class="store-info" style = "margin-top : 35px">
                    <h3>${store.name}</h3>
                    <p>${store.address}<p>
                    <p>${store.description}</p>
                </div>
            `;

            document.getElementById('sidebar').classList.add('show-sidebar');
        });

        var dropdownItem = document.createElement('a');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.textContent = store.name;
        dropdownItem.addEventListener('click', function() {
            map.flyTo({ center: store.coordinates });

            document.getElementById('store-info').innerHTML = `
                <div class="store-info" style = "margin-top : 35px">
                    <h3>${store.name}</h3>
                    <p>${store.address}</p>
                    <p>${store.description}</p>
                </div>
            `;

            document.getElementById('sidebar').classList.add('show-sidebar');
        });
        document.getElementById('store-list').appendChild(dropdownItem);
    });
}

function errorLocation() {
    console.error('Unable to retrieve your location');
}

function searchStore() {
    var searchInput = document.getElementById('search-input').value;
    var store = stores.find(function(store) {
        return store.name.toLowerCase() === searchInput.toLowerCase();
    });
    if (store) {
        map.flyTo({ center: store.coordinates });
        document.getElementById('store-info').innerHTML = `
            <div class="store-info" style="margin-top : 35px">
                <h3>${store.name}</h3>
                <p>${store.address}<p>
                <p>${store.description}</p>
            </div>
        `;
        document.getElementById('sidebar').classList.add('show-sidebar');
    } else {
        alert('Store not found!');
    }
}

function updateStoreList(stores) {
    var storeListElement = document.getElementById('store-list');
    storeListElement.innerHTML = '';

    stores.forEach(function(store) {
        var dropdownItem = document.createElement('a');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.textContent = store.name;
        dropdownItem.addEventListener('click', function() {
            map.flyTo({ center: store.coordinates });

            document.getElementById('store-info').innerHTML = `
                <div class="store-info" style="margin-top : 35px">
                    <h3>${store.name}</h3>
                    <p>${store.address}</p>
                    <p>${store.description}</p>
                </div>
            `;

            document.getElementById('sidebar').classList.add('show-sidebar');
        });
        storeListElement.appendChild(dropdownItem);
    });
}

function goHome() {
    navigator.geolocation.getCurrentPosition(function(position) {
        map.flyTo({ center: [position.coords.longitude, position.coords.latitude] });
    }, function(error) {
        console.error('Unable to retrieve your location');
    }, {
        enableHighAccuracy: true
    });
}
document.getElementById('shopsButton').addEventListener('click', function() {
    var rightSidebar = document.getElementById('rightSidebar');
    var shopListHTML = '';

    shops.forEach(function(shop) {
        shopListHTML += `
            <div class="card" style="margin-bottom: 10px;width: 330px; height: 350px ; margin-top : 30px ">
                <h3 style = "margin-top : 30px">Shops</h3>
                <div class="card-body">
                    <img src="${shop.images[0]}" class="card-img-top" alt="..." style = 'width: 280px; height: 140px'>
                    <h5 class="card-title">${shop.name}</h5>
                    <p class="card-text">${shop.address}</p>
                    <a href="#" class="card-link" onclick="showShopSidebar('${shop.name}')">Let's go shopping</a>

                </div>
            </div>
        `;
    });

    rightSidebar.innerHTML = shopListHTML;

    rightSidebar.style.right = '0';

    document.getElementById('sidebar').classList.remove('show-sidebar');
});


document.getElementById('hideButton').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('show-sidebar');
});

// Находим кнопку "Скрыть" по её идентификатору и добавляем обработчик события "click"
window.onload = function() {
            // Находим кнопку "Скрыть" по её идентификатору и добавляем обработчик события "click"
            document.getElementById('hideRightSidebarButton').addEventListener('click', function() {
                var rightSidebar = document.getElementById('rightSidebar');

                // Скрываем правый сайдбар, устанавливая значение right в -30%, чтобы его сдвинуть за пределы экрана
                rightSidebar.style.right = '-30%';
            });
        
// Function to show the shop sidebar
function showShopSidebar(shopName) {
    var shop = shops.find(function(shop) {
        return shop.name === shopName;
    });
}
    var shopSidebar = document.createElement('div');
    shopSidebar.className = 'shop-sidebar';
    shopSidebar.innerHTML = `
        <h3>${shop.name}</h3>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">T-Shirt</h5>
                <!-- Add more details as needed -->
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Pants</h5>
                <!-- Add more details as needed -->
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Shoes</h5>
                <!-- Add more details as needed -->
            </div>
        </div>
        <button class="btn btn-danger" style="margin-top: 20px;" onclick="hideShopSidebar()">Hide</button>
    `;

    document.body.appendChild(shopSidebar);
}

// Function to hide the shop sidebar
function hideShopSidebar() {
    var shopSidebar = document.querySelector('.shop-sidebar');
    shopSidebar.parentNode.removeChild(shopSidebar);
}


    function errorLocation() {
        console.error('Unable to retrieve your location');
    }

    function searchStore() {
        var searchInput = document.getElementById('search-input').value;
        var store = stores.find(function(store) {
            return store.name.toLowerCase() === searchInput.toLowerCase();
        });
        if (store) {
            map.flyTo({ center: store.coordinates });
            document.getElementById('store-info').innerHTML = `
                <div class="store-info" style="margin-top: 35px">
                    <h3>${store.name}</h3>
                    <p>${store.address}<p>
                    <p>${store.description}</p>
                </div>
            `;
            document.getElementById('sidebar').classList.add('show-sidebar');
        } else {
            alert('Store not found!');
        }
    }

    function goHome() {
        navigator.geolocation.getCurrentPosition(function(position) {
            map.flyTo({ center: [position.coords.longitude, position.coords.latitude] });
        }, function(error) {
            console.error('Unable to retrieve your location');
        }, {
            enableHighAccuracy: true
        });
    }

    document.getElementById('hideButton').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('show-sidebar');
    });

    window.onload = function() {
        document.getElementById('hideRightSidebarButton').addEventListener('click', function() {
            var rightSidebar = document.getElementById('rightSidebar');
            rightSidebar.style.right = '-30%';
        });
    }

    document.getElementById('shopsButton').addEventListener('click', function() {
        var rightSidebar = document.getElementById('rightSidebar');
        var shopListHTML = '';

        shops.forEach(function(shop) {
            shopListHTML += `
                <div class="card" style="margin-bottom: 10px;width: 330px; height: 350px;">
                    <div class="card-body">
                        <img src="${shop.images[0]}" class="card-img-top" alt="..." style="width: 280px; height: 140px;">
                        <h5 class="card-title">${shop.name}</h5>
                        <p class="card-text">${shop.address}</p>
                        <a href="#" class="card-link" onclick="showShopSidebar('${shop.name}')">Let's go shopping</a>
                    </div>
                </div>
            `;
        });

        rightSidebar.innerHTML = shopListHTML;
        rightSidebar.style.right = '0';
        document.getElementById('sidebar').classList.remove('show-sidebar');
    });

