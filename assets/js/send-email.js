var form = document.getElementById("send-mensage");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado por entrar em contato!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Houve um problema ao enviar o email. Porfavor tente novamente!"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Houve um problema ao enviar o email. Porfavor tente novamente!"
      });
    }
    form.addEventListener("submit", handleSubmit)