exports.questions = [{
    question: 'Qual desses ambientes você se imagina trabalhando?',
    A: 'Lugares com câmeras, plateia, palcos',
    B: 'Lugares abertos, na natureza, no campoim',
    C: 'Viajando, conhecendo a fundo sobre o mundo e o ser humano, ou em câmaras municipais, congressos',
    D: 'Bibliotecas, escritórios, salas de aula',
    E: 'Escritórios, construções, oficinas tecnológicas'
    },
    {
    question: 'Quando penso numa profissão, o mais importante para mim é:',
    A: 'Ser reconhecido e apreciado pelos outros',
    B: 'Ajudar a humanidade e os seres vivos do planeta, para que vivam mais e melhor',
    C: 'Contribuir para conhecimentos relacionados aos seres humanos e sua história',
    D: 'Conhecer melhor minha própria língua e as outras formas de comunicação',
    E: 'Inovar, criar ferramentas que auxiliem os seres humanas, levando conforto e praticidade além de solucionar carências da sociedade'
    },
    {
    question: 'Ao se sentir triste, qual destes itens mais te conforta?',
    A: 'Assistir séries, filmes ou desenhar',
    B: 'Brincar com meu animal de estimação, ou apreciar a natureza',
    C: 'Assistir documentários ou ajudar pessoas',
    D: 'Ler um livro',
    E: 'Assistir vídeos de construções ou informativos'
    },
    {
    question: 'Se você tivesse que fazer trabalho voluntário para uma ONG nas férias, quais das atividades você escolheria?',
    A: 'Dar aulas de teatro para crianças em uma comunidade',
    B: 'Participar de um planejamento de plantações que seja sustentável',
    C: 'Buscar patrocinadores para ajudar em um determinado projeto',
    D: 'Trabalhar na educação de jovens e adultos',
    E: 'Fazer um levantamento de recursos necessários para a comunidade'
    },
    {
    question: 'Você gostaria de se vestir de qual maneira no seu ambiente de trabalho?',
    A: 'Com vários tipos de roupa',
    B: 'Com trajes apropriados',
    C: 'Roupas formais',
    D: 'Com roupas informais',
    E: 'Uniformes'
    },
    {
    question: 'No seu cotidiano, você sente mais facilidade ao lidar com:',
    A: 'Músicas',
    B: 'Animais',
    C: 'Pessoas',
    D: 'Livros',
    E: 'Números'
    },
    {
    question: 'Se você tivesse que escolher um desses temas para um trabalho, qual seria?',
    A: 'O grafite como forma de expressão artística das ruas',
    B: 'O impacto da instalação de uma nova indústria na fauna de determinada região',
    C: 'Os impactos das políticas públicas na vida das populações carentes e em risco social',
    D: 'Criar um grupo de leitura e interpretação de textos',
    E: 'O desenvolvimento de um novo software para gestão financeira de microempresas'
    },    
    {
    question: 'Qual dessas opções você mais acredita? ',
    A: 'Sem arte o mundo seria sem graça',
    B: 'Se não cuidarmos do planeta, a espécie humana poderá desaparecer rapidamente',
    C: 'Se todos tivessem os mesmo direitos e oportunidades na vida o mundo seria melhor',
    D: 'O caminho para o crescimento é a educação',
    E: 'A tecnologia reinventa o ser humano todos os dias'
    },  
    {
    question: 'Você acredita que as pessoas seriam melhores se: ',
    A: 'Cultivassem mais o respeito e aceitassem que todos pensamos diferentes uns dos outros',
    B: 'Se preocupassem mais com a saúde do meio ambiente e das outras pessoas',
    C: 'Se preocupassem mais com os sentimentos das pessoas',
    D: 'Tivessem mais conhecimento sobre o mundo',
    E: 'Utilizassem mais a criatividade para coisas boas'
    }, 
    { 
    question: 'Um lápis e um papel podem ser mais úteis para: ',
    A: 'Fazer um desenho',
    B: 'Escrever ou desenhar em todos seus espaços para que seja 100% aproveitado',
    C: 'Escrever uma crítica sobre os males do mundo real',
    D: 'Escrever um poema',
    E: 'Colocar todos os gastos do mês e montar um mini planejamento'
    },  
];

exports.respostas = [];

exports.contarRespostas = (array) => {
    let artistico = 0;
    let humanas = 0;
    let natureza = 0;
    let exatas = 0;
    let linguagens = 0;

    array.map((x) => {
        switch (x){
            case 'A':
                artistico++;
                break;
            case 'B':
                humanas++;
                break;
            case 'C':
                natureza++
                break;    
            case 'D':
                exatas++;
                break;   
            case 'E':
                linguagens++;
                break;
            default:
                break;    
        }
    });  
    const counter = [artistico, humanas,natureza, exatas, linguagens]; 
    counter.sort();
    counter.reverse();
    const highest =counter.slice(0,3);
    const result =[];
    for(x=0; x<highest.length;x++){
        switch(highest[x]){
            case artistico:
                var teste = [{
                    type:"a", value: highest[x]
                }]
                result.push(teste);
           
                break;
            case humanas:
                 teste = [{
                    type:"b", value: highest[x]
                }]
                result.push(teste);

                break;
            case natureza:
                 teste = [{
                    type:"c", value: highest[x]
                }]
                result.push(teste);
                
                break;
            case exatas:
                 teste = [{
                    type:"d", value: highest[x]
                }]
                result.push(teste);
               
                break;
            case linguagens:
                 teste = [{
                    type:"e", value: highest[x]
                }]
                result.push(teste);
               
                break;
            default:
                console.log('error');
        }
    }

    var resultFinal = [];
    this.results.forEach((line) => {
        for(var i = 0; i < 3; i++){
            if (result[i][0].type == line.type ){
                resultFinal.push({
                    title: line.title ,
                    img: line.img,
                    description: line.description,
                    value: result[i][0].value
                })
                
            }
        }
    })
    resultFinal.reverse();
    return resultFinal;
} 

exports.results= [{
    type: 'a',
    title: 'ARTÍSTICO ',
    img: 'assets/img/resultados/artistica.jpg',
    description: 'O campo artístico estuda as relações corporais com o mundo e uma forma de exibir sentimentos e opiniões através de expressões diversas. A estética e a comunicação são pilares dessa área.'
},
{
    type: 'b',
    title: 'CIÊNCIAS NATURAIS',
    img: 'assets/img/resultados/ciencias-naturais.jpg',
    description: 'As Ciências Naturais, são responsáveis pelo estudo do meio ambiente vivido pelo ser humano, e do próprio ser vivo fisicamente, sendo um estudo fundamental para o desenvolvimento da sociedade e do ambiente em que ela vive.'
},
{
    type: 'c',
    title: 'HUMANAS ',
    img: 'assets/img/resultados/humanas.jpg',
    description:'Ciências Humanas é um campo do saber que tem como objeto de estudo principal o ser humano e todos os seus aspectos. O setor tem um caráter múltiplo e engloba características de inúmeros ramos do conhecimento, criando teorias profundas, complexas e de grande relevância para a sociedade.'
},
{
    type: 'd',
    title: 'LINGUAGENS ',
    img: 'assets/img/resultados/linguagens.jpg',
    description:'Linguagens é o campo do saber que visa estudar a relação e as formas de comunicação da sociedade como um todo, podendo ser de forma verbal, com observações e teorias que possibilitam a compreensão da evolução das línguas e desdobramentos dos diferentes idiomas, mas pode ser de forma não verbal, com o uso de movimentos.'
},
{
    type:'e',
    title: 'EXATAS ',
    img: 'assets/img/resultados/exatas.png',
    description:'As ciências Exatas são os campos que estudam os cálculos, medições e expressões, a fim de solucionar os problemas da sociedade, com resultados precisos que sempre seguem uma lógica, por isso o termo “Exatas”.'
}
]


