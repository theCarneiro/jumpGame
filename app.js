document.addEventListener('DOMContentLoaded',()=>{
    //cria a const grid a partir da classe .grid
    const grid = document.querySelector('.grid');
    // cria const chamada doodler do tipo div no html
    const doodler = document.createElement('div');
    //cria o espaço a esquerda do doodler
    let doddlerLeftSpace = 50;
    //cria o espaço abaixo do doodler
    let doddlerBottomSpace = 150;
    //essa variável verifica se o jogo acabou
    let isGameOver = false;
    //armazena a qtd de plataformas
    let platformCount = 5;

    // cria a função para colocar o doodler dentro da grid
    function createDoodler(){
        //o metdodo .appendChild coloca um filho(doodler) dentro do elemento pai(grid)
        grid.appendChild(doodler);
        ////metodo .classlist define uma classe pro elemento indicado antes do metodo
        doodler.classList.add('doodler');
        doodler.style.left = doddlerLeftSpace + 'px';
        doodler.style.bottom = doddlerBottomSpace + 'px';
    }
    //só pra testar a f1ç
    //createDoodler();

    //essa classe cria os obj platform
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

    function createPlatforms(){
        for(let i=0;i < platformCount; i++){
            let platGap = 600/platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform(newPlatBottom);
        }
    }

    function start(){
        //if(isGameOver=false){
        //se o jogo já acabou, chama a f1ç createDoodler() pra começar o jogo
        if(!isGameOver){
            createDoodler();
            createPlatforms();
        } 
    }
    //pode colocar um botão pra chamar essa f1ç
    start();
})