package com.futpao;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DadosController {
    
    private final DadosService service;
    
    public DadosController(DadosService service) {
        this.service = service;
    }
    
    @GetMapping("/dados")
    public Dados getDados() {
        Dados dados = service.carregarDados();
        System.out.println("📤 GET /api/dados - Quantidade: " + dados.getQuantidadeAtual());
        return dados;
    }
    
    @PostMapping("/dados")
    public void saveDados(@RequestBody Dados dados) {
        service.salvarDados(dados);
        System.out.println("📥 POST /api/dados - Quantidade: " + dados.getQuantidadeAtual());
    }
}
