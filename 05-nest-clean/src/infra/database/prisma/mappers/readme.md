# mappers

- o objetivo é alterar/converter uma entidade de camada de domínio para a camada de persistência (especificamente o prisma);
- as entidades de uma aplicação são representadas de maneiras diferentes para cada camada da aplicação;
- as camadas são organismos individuais, nem sempre devemos pensar neles conectados;
- observe quê, nem sempre uma entidade na camada de domínio vai representar uma tabela;
- uma possível forma de pensar, é estabelecer agregados. Ou seja, eu busco uma pergunta e as informações do author. Mas na entidade (domínio) de pergunta, não há as informações do author. Portanto, uma nova entidade nasce e que não necessariamente precisa de uma tabela, pois utilizada das existentes;
- uma tabela, nem sempre vai representar uma entidade, e vice-verso;