document.addEventListener('DOMContentLoaded',()=>{
    // cria a const grid a partir da classe .grid
    const grid = document.querySelector('.grid');
    // cria const chamada doodler do tipo div no html
    const doodler = document.createElement('div');
    // cria o espaço a esquerda do doodler
    let doddlerLeftSpace = 50;
    // ponto inicial do doodle
    let startPoint = 150;
    // cria o espaço abaixo do doodler
    let doddlerBottomSpace = startPoint;
    // essa variável verifica se o jogo acabou
    let isGameOver = false;
    // armazena a qtd de plataformas
    let platformCount = 5;
    // pra armazenar as plataformas em um array
    let platforms =[];
    // id de subida do doodle
    let upTimeId;
    // id de descida do doodle
    let downTimeId;
    // verifica se está pulando
    let isJumping=true;

    // função para criar o doodler dentro da grid
    function createDoodler(){
        // o metdodo .appendChild coloca um filho(doodler) dentro do elemento pai(grid)
        grid.appendChild(doodler);
        // metodo .classlist define uma classe pro elemento indicado antes do metodo
        doodler.classList.add('doodler');

        // aqui seta o doodler pra iniciar junto com a plataforma na posição 0 do array, 
        // pra ele não aparecer pulando do nada
        doddlerLeftSpace = platforms[0].left;

        doodler.style.left = doddlerLeftSpace + 'px';
        doodler.style.bottom = doddlerBottomSpace + 'px';
    }

    // essa classe cria os obj platform
    class Platform{
        //a cada ocorrẽncia de newPlatBottom - que é qd dado pelo for lá em createPlatform()
        constructor(newPlatBottom){
            //esse obj recebe um valor de bottom
            this.bottom = newPlatBottom;
            //aqui uso o met Math() para retornar um nr aleatório entre 0 e 315 - repara na escrita
            //315 é a largura da grid MENOS a largura da platform
            this.left = Math.random()*315;
            //cria o elemento platform como o doodler
            this.visual = document.createElement('div');

            //armazena a informação visual do obj em uma const pra poder receber personalização da classe
            const visual = this.visual;
            //aqui define a classe platform pra informação visual
            visual.classList.add('platform');
            //cria o espaçamento baseado na informação this.left definida acima
            visual.style.left = this.left + 'px';
            //cria o espaçamento baseado na informação this.bottom definida acima
            visual.style.bottom = this.bottom + 'px';

            //toda essa classe Platform resulta nesse visual, que é o elemento que 
            //vai aparecer na grid
            grid.appendChild(visual);
        }
    }

    // função usada para chamar a class Platform
    function createPlatforms(){
        for(let i=0;i < platformCount; i++){
            let platGap = 600/platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform);
            console.log(platforms);
        }
    }

    // função usada para criar o efeito de queda das plataformas
    function movePlatforms(){
        //qd o bottom do doodle passar de 200px
        if (doddlerBottomSpace>200){
            //pra cada elemento platform da array platforms
            platforms.forEach(platform => {
                //diminui 4
                platform.bottom -=2;
                //cria a let visual pra armazenar a informação criada
                let visual = platform.visual;
                //define o bottom do visual para 4px - platforms[platform[visual[style[bottom]]]]
                visual.style.bottom= platform.bottom + 'px'
            });
        }

    }

    function jump(){
        clearInterval(downTimeId);
        isJumping = true;
        upTimeId = setInterval(function(){
            doddlerBottomSpace+=15;
            doodler.style.bottom = doddlerBottomSpace+'px';
            // aqui mudou da v1.1 que antes ia até o pt 350px e começava a cair
            // agr cai quando chega no startPoint + 250, sendo que agr o
            // startPoint é dinâmico e muda a cada colisão
            if(doddlerBottomSpace > startPoint+250){
                fall();
            }
        },30)
    }

    function fall(){
        clearInterval(upTimeId);
        isJumping = false;
        downTimeId = setInterval(function(){
            doddlerBottomSpace-=5;
            doodler.style.bottom = doddlerBottomSpace+'px';
            if(doddlerBottomSpace<=0){
                gameOver()
            }
            // aqui configuramos a colisão
            platforms.forEach(platform=>{
                if(
                // essas duas condições iniciais verifica se o bottom do doodle está entre
                // os 15px de altura da plataforma
                (doddlerBottomSpace>=platform.bottom) && 
                (doddlerBottomSpace<=platform.bottom+15) &&
                // essa verifica se o doodle caiu sobre o ponto inicial de uma plataforma
                ((doddlerLeftSpace+60)>=platform.left) &&
                // essa verifica se o doodle caiu até o ponto final de uma plataforma
                (doddlerLeftSpace<= (platform.left)+85) &&
                !isJumping
                ){
                    // se acertou uma plataforma, registra o log, set o novo startPoint
                    // e chama a função pra pular dnv  
                    console.log("acertou uma plataforma")
                    startPoint = doddlerBottomSpace;
                    jump();
                }
            })            
        },30)
    }

    function gameOver(){
        console.log('game over');
        isGameOver=true;
        clearInterval(upTimeId);
        clearInterval(downTimeId);
    }

    function control(e){
        if(e.key==="ArrowLeft"){
            //moveLeft
        }else if(e.key==="ArrowRight"){
            //moveRight
        }else if(e.key==="ArrowUp"){
            ///moveStraight
        }
    }

    function start(){
        //if(isGameOver=false){
        //se o jogo já acabou, chama a f1ç createDoodler() pra começar o jogo
        if(!isGameOver){
            // esse metodo precisa vir antes do createDoodler, pq o segundo usa info
            // gerada no primeiro
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms,30);
            jump();
        } 
    }
    //pode colocar um botão pra chamar essa f1ç
    start();
})