document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const imageFolder = './image/'; // 相對路徑指向 image 文件夾
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg']; // 圖片文件名列表
    let currentIndex = 0;
    let currentImageElement = null;

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Gallery image";
        // 初始設置在右側外部並透明，準備滑入和淡入
        gsap.set(img, { opacity: 0, position: 'absolute', top: '50%', left: '50%', xPercent: 100, yPercent: -50, maxWidth: '100%', maxHeight: '100%' });
        return img;
    }

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImageSrc = `${imageFolder}${images[nextIndex]}`;
        const nextImageElement = createImageElement(nextImageSrc);
        gallery.appendChild(nextImageElement);

        // 新圖片從右側滑入並淡入
        gsap.to(nextImageElement, { 
            xPercent: -50, // 滑動到中間
            opacity: 1, 
            duration: 1.5, // 調整動畫持續時間
            ease: 'power3.inOut',
            onComplete: () => {
                console.log('Next image slid in and faded in:', nextImageSrc);
            }
        });

        // 延遲 12 秒後再讓舊圖片滑出並淡出
        if (currentImageElement) {
            setTimeout(() => {
                gsap.to(currentImageElement, { 
                    xPercent: -150, // 滑動到左側外部
                    opacity: 0, 
                    duration: 1.5, // 調整動畫持續時間
                    ease: 'power3.inOut', 
                    onComplete: () => {
                        currentImageElement.remove();
                        console.log('Previous image slid out and faded out.');
                    }
                });
            }, 12000);
        }

        currentImageElement = nextImageElement;
        currentIndex = nextIndex;
    }

    // 初始顯示第一張圖片，從中間淡入（不滑動，因為是第一張）
    const initialImageSrc = `${imageFolder}${images[currentIndex]}`;
    currentImageElement = createImageElement(initialImageSrc);
    // 為了初始圖片直接在中間顯示，我們在創建後立即將其 xPercent 設為 -50
    gsap.set(currentImageElement, { xPercent: -50 }); 
    gallery.appendChild(currentImageElement);
    gsap.to(currentImageElement, { 
        opacity: 1, 
        duration: 1.5, // 調整動畫持續時間
        ease: 'power3.inOut',
        onComplete: () => {
            console.log('Initial image faded in at center.');
        }
    });

    // 每隔一段時間切換圖片 (例如 12 秒)
    setInterval(showNextImage, 12000);
});