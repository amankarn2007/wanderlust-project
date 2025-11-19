mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/standard-satellite', // Style URL
    //center: coordinates, // starting position [lng, lat].
    center: listing.geometry.coordinates, // [lng, lat]
    zoom: 9 // starting zoom
});

console.log(listing.geometry.coordinates);

const marker = new mapboxgl.Marker({color: 'red'})
    .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
    .setPopup(
        new mapboxgl.Popup({offset:25}).setHTML(
            `<h5> ${listing.title} </h5> <p> Exact location provided after the booking </p>`
        )
    )
    .addTo(map);