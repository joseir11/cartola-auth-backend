package com.futpao;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class DadosService {
    
    private static final String ARQUIVO = "dados.json";
    private final ObjectMapper mapper = new ObjectMapper();
    
    private Dados dadosPadrao = new Dados(1, new ArrayList<>(Arrays.asList("JOGADOR 1")), 
                                          "26/04/2026", "12h30", "A DEFINIR");
    
    public Dados carregarDados() {
        try {
            File file = new File(ARQUIVO);
            if (file.exists()) {
                return mapper.readValue(file, Dados.class);
            } else {
                salvarDados(dadosPadrao);
                return dadosPadrao;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return dadosPadrao;
        }
    }
    
    public void salvarDados(Dados dados) {
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(ARQUIVO), dados);
            System.out.println("✅ Dados salvos em " + ARQUIVO);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
