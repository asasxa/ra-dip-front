import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <section className="top-sales">
                <h2 className="text-center">Произошла ошибка</h2>
                <p className="text-center">
                  {this.state.error?.message || 'Что-то пошло не так'}
                </p>
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => window.location.reload()}
                  >
                    Перезагрузить страницу
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}