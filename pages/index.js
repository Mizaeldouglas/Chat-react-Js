import appConfig from "../confg.json";
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useState } from "react";
import { useRouter } from "next/router"
import img from "../img/Intro.gif"




function Titulo(props){
    const Tag = props.tag || 'h1'
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag}{
                        color: ${appConfig.theme.colors.neutrals['000']};
                        font-size:24px;
                        font-weight:600;
                    }
                `}
            </style>
        </>
    )
}

// function HomePage() {
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag ="h2">Boas Vinda de volta</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//             <style jsx>
//                 {`
//                     h1{
//                         color: red;
//                     }
//                 `}
//             </style>


//         </div>
//         )
//   }
  
//   export default HomePage

export default function PaginaInicial() {
    // const username = 'Mizaeldouglas';
    const [username ,setUsername] = useState('Mizaeldouglas')
    const roteamento = useRouter()

  function caracteries (arr,funcao){
    for(let i =0;i <arr.length; i= i +1){
      const itemDoArrey = arr[i]
      funcao(itemDoArrey,i)
    }
  }
  const retornoCaracteries = caracteries(setUsername, function(caracters, i){
    console.log(caracters,i)
    return
  })
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://media.giphy.com/media/l1uguGf2RVIsTXNDO/giphy.gif)',
            backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundBlendMode: 'multiply',
          
          }}
          
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[999],
              
            }}
          >
            {/* Formulário */}
            <Box
            as="form"
            onSubmit={function (infosdoEvento){
              infosdoEvento.preventDefault()
              console.log("alguem submeteu o for")
              
              console.log(retornoCaracteries)

              roteamento.push('/chat')
            }}
              styleSheet={{
                
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">In a galaxy far, far away...</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
              
              {/* <input 
              type="text"
              value={username}
              onChange={function (e){
                console.log('digitou',e.target.value)
                //valor da variavel
                const valor = e.target.value;
                // trocar o valor da variavel
                setUsername(valor)
              }}
              /> */}



               <TextField
                fullWidth
                value={username}
              onChange={function (e){
                console.log('digitou',e.target.value)
                //valor da variavel
                const valor = e.target.value;
                // menor que 2 caracteries
                if(e.target.value < 3){
                  console.log('error')
                }
                // trocar o valor da variavel
                setUsername(valor)
              }}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              /> 
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["001"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid ',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.primary[600],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }