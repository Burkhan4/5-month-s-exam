document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('nav-sections');
    const menuContainer = document.querySelector('.nav-sections');

    if (!menuButton || !menuContainer) return;

    menuButton.addEventListener('click', () => {
        menuContainer.classList.toggle('hidden');

        const img = menuButton.querySelector('img');
        if (img) {
            if (menuContainer.classList.contains('hidden')) {
                img.src = './public/svg/mobile-nav-sections.svg';
                img.alt = 'sections';
            } else {
                img.src = './public/img/x.png';
                img.alt = 'close';
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!menuContainer.contains(e.target) && !menuButton.contains(e.target)) {
            if (!menuContainer.classList.contains('hidden')) {
                menuContainer.classList.add('hidden');
                const img = menuButton.querySelector('img');
                if (img) {
                    img.src = './public/svg/mobile-nav-sections.svg';
                    img.alt = 'sections';
                }
            }
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {

    const movieGrid = document.querySelector('.movie-grid');

    if (movieGrid) {
        fetch('https://api.imdbapi.dev/titles')
            .then(response => {
                if (!response.ok) {
                    throw new Error('API javobi muvaffaqiyatsiz: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.titles && Array.isArray(data.titles)) {
                    const titlesWithPoster = data.titles
                        .filter(title => title.primaryImage && title.primaryImage.url)
                        .slice(0, 21);

                    titlesWithPoster.forEach(title => {
                        const posterUrl = title.primaryImage.url;
                        const imdbId = title.id;

                        const img = document.createElement('img');
                        img.src = posterUrl;
                        img.alt = title.primaryTitle || 'Movie poster';
                        img.loading = 'lazy';

                        img.addEventListener('click', () => {
                            window.location.href = `film.html?id=${imdbId}`;
                        });

                        movieGrid.appendChild(img);
                    });

                    if (titlesWithPoster.length < 21) {
                        for (let i = titlesWithPoster.length; i < 21; i++) {
                            const placeholder = document.createElement('div');
                            placeholder.style.width = '231px';
                            placeholder.style.height = '347.82px';
                            placeholder.style.background = '#1a1a1a';
                            placeholder.style.borderRadius = '12px';
                            movieGrid.appendChild(placeholder);
                        }
                    }
                } else {
                    console.warn('titles array topilmadi yoki bo\'sh');
                }
            })
            .catch(error => {
                console.error('API xatosi:', error);
                movieGrid.innerHTML = '<p class="text-center text-red-500 col-span-7">Kinolar yuklanmadi. Internetni tekshiring.</p>';
            });
    }
});

const mobileMovieGrid = document.querySelector('.mobile-movie-grid');

if (mobileMovieGrid) {
    fetch('https://api.imdbapi.dev/titles')
        .then(response => {
            if (!response.ok) {
                throw new Error('API xatosi: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.titles && Array.isArray(data.titles)) {
                const titlesWithPoster = data.titles
                    .filter(title => title.primaryImage && title.primaryImage.url)
                    .slice(0, 30);

                titlesWithPoster.forEach(title => {
                    const posterUrl = title.primaryImage.url;
                    const imdbId = title.id;

                    const img = document.createElement('img');
                    img.src = posterUrl;
                    img.alt = title.primaryTitle || 'Movie poster';
                    img.loading = 'lazy';

                    img.addEventListener('click', () => {
                        window.location.href = `film.html?id=${imdbId}`;
                    });

                    mobileMovieGrid.appendChild(img);
                });

                if (titlesWithPoster.length < 30) {
                    for (let i = titlesWithPoster.length; i < 30; i++) {
                        const placeholder = document.createElement('div');
                        placeholder.style.width = '111px';
                        placeholder.style.height = '155px';
                        placeholder.style.background = '#1a1a1a';
                        placeholder.style.borderRadius = '8px';
                        mobileMovieGrid.appendChild(placeholder);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Mobil API xatosi:', error);
            mobileMovieGrid.innerHTML = '<p class="text-center text-red-500 col-span-3 py-4">Ma\'lumotlar yuklanmadi</p>';
        });
}