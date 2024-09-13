// Espera até que a página seja totalmente carregada
window.addEventListener('load', function () {
    // Aguarda o carregamento completo das imagens
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    // Função para contar imagens carregadas
    const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            document.getElementById('preloader').style.display = 'none';
        }
    };

    // Verifica se as imagens já foram carregadas
    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded); // Para garantir a remoção mesmo em caso de erro
        }
    });
});
