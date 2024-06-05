// document.querySelector('#hide-sidebar').addEventListener('click', () => {
//     document.querySelector('.sidebar').classList.toggle('open');
// })

document.querySelector('.filters-open').addEventListener('click', () => {
    document.querySelector('#filters').classList.toggle('hidden');
    console.log(1);
})

document.addEventListener("DOMContentLoaded", function() {
    const mapTypes = document.querySelectorAll('.maptype');

    mapTypes.forEach((mapType, index) => {
        mapType.addEventListener('click', function() {
            // Remove 'active' class from all elements
            mapTypes.forEach(mt => mt.classList.remove('active'));
            // Add 'active' class to the clicked element
            this.classList.add('active');

            if (index === 0) {
                document.querySelector('#filters').classList.remove('hidden-filters');
                console.log(1);
            } else {
                document.querySelector('#filters').classList.add('hidden-filters');
                console.log(2);
            }
        });
    });
});

document.querySelector('#layers').addEventListener('click', () => {
    document.querySelector('#types').classList.toggle('hidden')
})