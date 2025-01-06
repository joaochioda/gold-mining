"use client";

import React, { Component, ReactNode } from "react";

// Tipando a propriedade 'children' para que o componente aceite filhos
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Atualiza o estado para renderizar a interface de fallback
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Você pode logar o erro para monitoramento ou qualquer outra ação
    console.error("Erro capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Exibe uma interface de fallback
      return (
        <div>
          <h1>Algo deu errado!</h1>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    // Caso não haja erro, renderiza os filhos
    return this.props.children;
  }
}

export default ErrorBoundary;
