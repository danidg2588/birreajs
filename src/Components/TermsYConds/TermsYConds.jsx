import React, { useEffect, useState } from 'react'
import { FaVolleyballBall } from "react-icons/fa";
import './terms.scss'
import axios from 'axios';


export const TermsYConds = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [background, setBackground] = useState(null)

  useEffect(() => {
    async function loadBackground() {
        try
        {
            axios.get('https://danilo2588.pythonanywhere.com/background', {
              Timeout:3500,
            })
            .then(function (response) {
                setBackground(response.data)
            })
        }
        catch(e)
        {
          console.log(e)
        }
        finally
        {
          setIsLoading(false);
        }
    };
    loadBackground()
  },[]);

  return (
    <main>
      {isLoading ?
        <div className="loading">
          <FaVolleyballBall className="loading-icon" />
        </div>
      :
      <div className='wizard'>
        <div style={{backgroundImage:`url("${background}")`}} className="wizard-card"></div>
        <div className="wizard-wrapper">
          <div className="terms-and-conditions">

            <h1 className='uppercase'>Términos y Condiciones</h1>

            <div className="paragraph">
              <h3 className='uppercase'>
                1. Propósito
              </h3>
              <p>
                Birrea App es simplemente una aplicación de gestión de reservas de espacios deportivos.
              </p>
              <p>
                Nuestros slogan es: <span className='slogan'>Entra, reserva y birrea</span> porque es simplemente lo que necesitas hacer para asegurar el espacio para ti y tus amigos.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                2. Uso de datos
              </h3>
              <p>
                No usamos tus datos más que los que ingresas para realizar la reserva de tu cancha.
              </p>
              <p>
              Tu número de teléfono será solamente almacenado para comprobar que ya lo haz autenticado anteriomente en tus reservas, no te enviaremos ningún tipo de mensajes y puedes solicitar que tus datos sean borrados enviando un correo a reservas@birrea.com.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                3. Reservas
              </h3>
              <p>
                La primera vez que reserves el negocio a quién reserva confirmará tu número de contacto (celular). Si necesitas cancelar o cambiar la fecha, debes contactar al negocio y pedir el cambio de fecha, hora, cancelación  o anulación de la reserva. De lo contrario la empresa socio castigará tu número de teléfono y tus futuras reservas no serán aceptadas a menos que canceles con de 24 horas de anticipación; es decir, si no pagas 24 horas antes, otras personas podrán tomar la fecha y la hora en que quisistes reservar. 
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                4. Comunicaciones whatasp
              </h3>
              <p>
                Esperamos que whatasp nos autorice para poder enviarte la confirmación de tu reserva, la información de pago para confirmar tu reserva, la dirección y contacto de nuestro socio. No te enviaremos ningún otro tipo de comunicación. Si deseas que tus datos sean borrados, puedes enviarnos un correo a reservas@birrea.com.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                5. Contacto
              </h3>
              <p>
                Birrea App no se contactará contigo por ningún medio (a menos que Whataspp nos apruebe), de nosotros recibir aprobación como primera y casi única comunicación te enviaremos un código para que confirmes tu número de teléfono, te enviaremos también el contacto de nuestro socio a quién le has reservado un espacio deportivo y no te enviaremos ninguna otra información a tu número. No podemos controlar ni supervisar las conversaciones que mantengas con nuestros socios, estos han aceptado en solo contactarte estrictamente en relación a las reservas que hayas realizado con ellos, en caso contrario puedes escribirnos a reservas@birrea.com.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                6. Socios
              </h3>
              <p>
                Nuestros socios son negocios que ofrecen espacios para esparcimiento y actividades deportivas en el territorio panameño, cada socio tiene diferentes reglas y condiciones que debes consultar.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                7. Generales
              </h3>
              <p>
                Mmmm.... realmente esta aplicación es bien sencilla, esperamos que disfrutes con tus amigos de nuestra aplicación y tu reserva.
              </p>
            </div>

            <div className="paragraph">
              <h3 className='uppercase'>
                8. Responsabilidades
              </h3>
              <p>
                Birrea App es solo una plataforma de reservas de espacio deportivos y no nos podemos hacer responsables por daños, lesiones y otras circunstancias occuridas dentro o fuera de las instalaciones de nuestros socios.
              </p>
            </div>
          </div>
        </div>
      </div>
      }
    </main>
  )
}
