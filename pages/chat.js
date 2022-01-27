import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import appConfig from '../confg.json';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NzU3MiwiZXhwIjoxOTU4ODYzNTcyfQ.59CP6iBtx62d50_3RJaGjqypY86KlshSIN8h2ZwSbaI'
const SUPABASE_URL = 'https://httdkeocymtmvtfxnrvx.supabase.co'
const supabaseClient = createClient(SUPABASE_URL,SUPABASE_ANON_KEY)



export default function ChatPage() {
    // Sua lógica vai aqui


        const [mensagem, setMensagem] = useState('')
        const [username ,setUsername] = useState('Mizaeldouglas')
        const [listaDeMensagens ,setListaDeMensagens] = React.useState([])


        React.useEffect(() =>{
            supabaseClient
               .from('mensagens')
               .select('*')
               .order('id',{ ascending:false })
               .then(({data,}) =>{
                    console.log("dados da consuldas")
                    setListaDeMensagens(data)
               })
        }, [])


        function handleNovaMensagem(novaMensagem){
            const mensagem = {
                //id: listaDeMensagens.length +1,
                de: username,
                texto: novaMensagem,

            }
            supabaseClient 
                .from('mensagens')
                .insert([
                    // tem que ser um objeto com os MESMO CAMPOS que você escreveu no supabese
                    mensagem
                ])
                .then(({ data })=>{
                    console.log('criando mensagem: ')
                    setListaDeMensagens([
                        data[0],
                        ...listaDeMensagens
                    ])
                })
                setMensagem('')
        
        }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[200],
                backgroundImage: 'url(https://media.giphy.com/media/S3PBXqHjKL9GZhK2Yv/giphy.gif)',
                backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['900']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',

                    opacity: 0.9,
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                        {/* MensageList list é para colocar os useState em outra funçao */}
                    
                    
                    <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} />
                   
                   
                   
                    {/* {listaDeMensagens.map((mensagemAtual ) =>{
                        console.log(mensagemAtual.id);
                        return(
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })}  */}

                    



                    <Box
                    
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) =>{
                                const valor =e.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(e) =>{
                                if(e.key ==='Enter'){
                                    e.preventDefault()
                                    handleNovaMensagem(mensagem)
                                 }}
                            }
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                         <Button
                         onClick={(e)=>{
                             if(e.type === 'click'){
                                 handleNovaMensagem(mensagem)
                             }
                         }}
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Enviar'
                />
                
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',color:appConfig.theme.colors.primary[500]}} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props)  {
    const [username ,setUsername] = useState('Mizaeldouglas')
    console.log(props.listaDeMensagens);
    
    function handleDeleteMessage(mensagemId){
        let novaLista = props.mensagens.filter((message)=>{
            if(message.id !== mensagemId){
                return message
            }
        })

        props.setListaDeMensagens([
            ...novaLista
        ])
    }

    const { data, error } =  supabaseClient 
    .from('mensagem')
    .delete(handleDeleteMessage)
    .match({  })
   
   

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem ) =>{
                return(
                    <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${mensagem.de}.png`}
                    />
                    <Text tag="strong">
                        {mensagem.de}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {mensagem.texto} 
                <Button
                    styleSheet={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        marginLeft:'95%',
                        transition: '0.6s ease',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                    onClick={(data) => handleDeleteMessage(mensagem.id)}
                    type='reset'
                    variant='tertiary'
                    colorVariant='neutral'
                    label='🗑'
                />
            </Text>
                )
            })}
            
        </Box>
    )
}