"use client";

import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, MessageSquare, FileText, Zap, Target, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OpportunityFinder from "./components/OpportunityFinder";
import ServiceCreator from "./components/ServiceCreator";
import AutomationHub from "./components/AutomationHub";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const storedUser = localStorage.getItem("despertar_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
      setShowWelcome(false);
    }
  }, []);

  const handleStartJourney = (name: string) => {
    const user = {
      name,
      createdAt: new Date().toISOString(),
      level: 1,
      earnings: 0,
    };
    localStorage.setItem("despertar_user", JSON.stringify(user));
    setUserName(name);
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Bem-vindo ao Futuro</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                O Despertar
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                Construa sua Renda Digital com Inteligência Artificial
              </p>
              
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Identifique oportunidades, crie serviços digitais e automatize seu crescimento. 
                Tudo em um só lugar.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Identifique Oportunidades</CardTitle>
                  <CardDescription>
                    Descubra micro-oportunidades em Instagram e WhatsApp com análise inteligente
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Crie Serviços Digitais</CardTitle>
                  <CardDescription>
                    Gere textos de anúncio e páginas de venda profissionais com templates de IA
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Automatize Processos</CardTitle>
                  <CardDescription>
                    Configure mensagens automáticas e entregas para escalar seu negócio
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Acompanhe Resultados</CardTitle>
                  <CardDescription>
                    Dashboard completo com métricas e insights para otimizar sua estratégia
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* CTA Form */}
            <Card className="border-2 border-purple-200 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Comece sua Jornada Agora</CardTitle>
                <CardDescription>
                  Digite seu nome para criar seu perfil e desbloquear todas as ferramentas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") as string;
                    if (name.trim()) {
                      handleStartJourney(name.trim());
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    required
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-lg"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Começar Agora
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gratuito</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">IA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Powered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">O Despertar</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Olá, {userName}!</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("Deseja realmente sair? Seus dados estão salvos localmente.")) {
                  setShowWelcome(true);
                }
              }}
            >
              Trocar Usuário
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Oportunidades</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Serviços</span>
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Automação</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard userName={userName} />
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <OpportunityFinder />
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServiceCreator />
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <AutomationHub />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>O Despertar - Construindo o futuro da renda digital com IA</p>
        </div>
      </footer>
    </div>
  );
}
