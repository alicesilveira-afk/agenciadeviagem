# CVC PB – Sousa

Site institucional estático com oito páginas. Não requer dependências ou etapa de build.

## Executar localmente

Abra `index.html` em um servidor estático, como a extensão Live Server do VS Code. Se Python estiver instalado, também é possível iniciar um servidor local a partir desta pasta com:

```powershell
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

Os formulários validam os campos no navegador e abrem uma mensagem editável no WhatsApp da unidade. Não há integração de reservas, pagamentos, inventário ou confirmação de disponibilidade.
