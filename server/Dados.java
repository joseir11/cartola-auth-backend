package com.futpao;

import java.util.List;

public class Dados {
    private int quantidadeAtual;
    private List<String> nomesJogadores;
    private String dataSelecionada;
    private String horarioSelecionado;
    private String localSelecionado;

    public Dados() {}

    public Dados(int quantidadeAtual, List<String> nomesJogadores, String dataSelecionada, 
                 String horarioSelecionado, String localSelecionado) {
        this.quantidadeAtual = quantidadeAtual;
        this.nomesJogadores = nomesJogadores;
        this.dataSelecionada = dataSelecionada;
        this.horarioSelecionado = horarioSelecionado;
        this.localSelecionado = localSelecionado;
    }

    // Getters e Setters
    public int getQuantidadeAtual() { return quantidadeAtual; }
    public void setQuantidadeAtual(int quantidadeAtual) { this.quantidadeAtual = quantidadeAtual; }
    
    public List<String> getNomesJogadores() { return nomesJogadores; }
    public void setNomesJogadores(List<String> nomesJogadores) { this.nomesJogadores = nomesJogadores; }
    
    public String getDataSelecionada() { return dataSelecionada; }
    public void setDataSelecionada(String dataSelecionada) { this.dataSelecionada = dataSelecionada; }
    
    public String getHorarioSelecionado() { return horarioSelecionado; }
    public void setHorarioSelecionado(String horarioSelecionado) { this.horarioSelecionado = horarioSelecionado; }
    
    public String getLocalSelecionado() { return localSelecionado; }
    public void setLocalSelecionado(String localSelecionado) { this.localSelecionado = localSelecionado; }
}
