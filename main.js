const form = document.getElementById('form-phone-book');  
const inputNomeTelefone = document.getElementById('name-phone');  
const inputNumeroTelefone = document.getElementById('number-phone');  
const inputEmailTelefone = document.getElementById('email-phone');  

const nomes = [];  
const numeros = [];  
const emails = [];  
let linhas = '';  

form.addEventListener('submit', function (e) {  
    e.preventDefault();  
    adicionarLinha();  
    atualizarTabela();  
});  

function adicionarDDD(numero) {  
    const ddd = numero.slice(0, 2);   
    const telefone = numero.slice(2); 
    return `(${ddd}) ${telefone}`; 
}  

function adicionarLinha() {  
    const numeroTelefone = inputNumeroTelefone.value.trim();  

    // isso daqui validad o numero 
    if (numeroTelefone.length < 10 || numeroTelefone.length > 11) {  
        alert("Por favor, insira um número de telefone válido. Deve ter 10 ou 11 dígitos.");  
        return;
    }  

    // 
    if (!/^\d+$/.test(numeroTelefone)) {  
        alert("Por favor, insira apenas números no telefone.");  
        return;  
    }  

    //  e pra garanti que o DD seja valido mas meio que n funciona 
    if (!/^\d{2}/.test(numeroTelefone)) {  
        alert("O DDD deve ser composto por 2 dígitos.");  
        return;  
    }  

    // isso ve se o numero ja existe nos contatos 
    if (numeros.includes(numeroTelefone)) {  
        alert(`O número ${adicionarDDD(numeroTelefone)} já foi inserido`);  
    } else {  
        nomes.push(inputNomeTelefone.value);  
        numeros.push(numeroTelefone);  
        emails.push(inputEmailTelefone.value);  

        let linha = `<tr>`;  
        linha += `<td>${inputNomeTelefone.value}</td>`;  
        linha += `<td>${adicionarDDD(numeroTelefone)}</td>`; // essa parada aqui formata o numero e bota os dois primeiros em parenteses
        linha += `<td><a href="mailto:${inputEmailTelefone.value}">${inputEmailTelefone.value}</a></td>`;  
        linha += `  
            <td>  
                <div class="menu-container">  
                    <span onclick="toggleMenu(event)" style="cursor: pointer;">•••</span>  
                    <div class="menu-opcoes">  
                        <a href="#" onclick="editarContato(${nomes.length - 1})">Editar</a>  
                        <a href="#" onclick="removerContato(${nomes.length - 1})">Excluir</a>  
                    </div>  
                </div>  
            </td>  
        `;  
        linha += `</tr>`;  

        linhas += linha;  
    }  

    inputNomeTelefone.value = '';  
    inputNumeroTelefone.value = '';  
    inputEmailTelefone.value = '';  
}  

function atualizarTabela() {  
    const corpoTabela = document.querySelector('tbody');  
    corpoTabela.innerHTML = linhas;  
}  

function editarContato(index) {  
    inputNomeTelefone.value = nomes[index];  
    inputNumeroTelefone.value = numeros[index];  
    inputEmailTelefone.value = emails[index];  
    removerContato(index);
}  

function removerContato(index) {  
    if (confirm("Você tem certeza que deseja editar/excluir este contato?")) {  
        nomes.splice(index, 1);  
        numeros.splice(index, 1);  
        emails.splice(index, 1);  

        linhas = ''; 
        nomes.forEach((nome, i) => {  
            linhas += `<tr>  
                <td>${nome}</td>  
                <td>${adicionarDDD(numeros[i])}</td>`; 
            linhas += `<td>${emails[i]}</td>  
                <td>  
                    <div class="menu-container">  
                        <span onclick="toggleMenu(event)" style="cursor: pointer;">•••</span>  
                        <div class="menu-opcoes">  
                            <a href="#" onclick="editarContato(${i})">Editar</a>  
                            <a href="#" onclick="removerContato(${i})">Excluir</a>  
                        </div>  
                    </div>  
                </td>  
            </tr>`;  
        });  
        atualizarTabela();
    }  
}  

function toggleMenu(event) {  
    const menu = event.target.parentElement.querySelector('.menu-opcoes');  
    const isVisible = menu.style.display === 'block';  

    // essa parada esconde os menus
    const allMenus = document.querySelectorAll('.menu-opcoes');  
    allMenus.forEach(m => {  
        m.style.display = 'none';  
    });  

    menu.style.display = isVisible ? 'none' : 'block';  
}  

// e isso garantir que o menu feche ao clicar fora dele  
document.addEventListener('click', function(event) {  
    if (!event.target.closest('.menu-container')) {  
        const allMenus = document.querySelectorAll('.menu-opcoes');  
        allMenus.forEach(m => {  
            m.style.display = 'none';  
        });  
    }  
});


// Esse trabalho foi um pouco dificil pois eu quis implementar varias funções novas, tive muito ajuda de inteligencia artificial e que mão na roda!! mas foi um baita aprendizado 