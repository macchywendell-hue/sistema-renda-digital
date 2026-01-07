"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Zap, Award, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DashboardProps {
  userName: string;
}

interface UserStats {
  totalServices: number;
  totalOpportunities: number;
  totalAutomations: number;
  estimatedEarnings: number;
  level: number;
  experience: number;
}

export default function Dashboard({ userName }: DashboardProps) {
  const [stats, setStats] = useState<UserStats>({
    totalServices: 0,
    totalOpportunities: 0,
    totalAutomations: 0,
    estimatedEarnings: 0,
    level: 1,
    experience: 0,
  });

  useEffect(() => {
    // Carregar estatísticas do localStorage
    const services = JSON.parse(localStorage.getItem("despertar_services") || "[]");
    const opportunities = JSON.parse(localStorage.getItem("despertar_opportunities") || "[]");
    const automations = JSON.parse(localStorage.getItem("despertar_automations") || "[]");
    const user = JSON.parse(localStorage.getItem("despertar_user") || "{}");

    const totalEarnings = services.reduce((sum: number, service: any) => {
      return sum + (service.estimatedValue || 0);
    }, 0);

    const experience = services.length * 10 + opportunities.length * 5 + automations.length * 15;
    const level = Math.floor(experience / 50) + 1;

    setStats({
      totalServices: services.length,
      totalOpportunities: opportunities.length,
      totalAutomations: automations.length,
      estimatedEarnings: totalEarnings,
      level,
      experience: experience % 50,
    });
  }, []);

  const experienceToNextLevel = 50;
  const progressPercentage = (stats.experience / experienceToNextLevel) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-2xl">Bem-vindo de volta, {userName}!</CardTitle>
          <CardDescription>
            Aqui está um resumo da sua jornada no Despertar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Nível {stats.level}</span>
                <span className="text-sm text-gray-500">
                  {stats.experience}/{experienceToNextLevel} XP
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Serviços Criados
              </CardTitle>
              <Target className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalServices}
            </div>
            <p className="text-xs text-gray-500 mt-1">+10 XP por serviço</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Oportunidades
              </CardTitle>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalOpportunities}
            </div>
            <p className="text-xs text-gray-500 mt-1">+5 XP por oportunidade</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Automações Ativas
              </CardTitle>
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalAutomations}
            </div>
            <p className="text-xs text-gray-500 mt-1">+15 XP por automação</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Potencial de Renda
              </CardTitle>
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              R$ {stats.estimatedEarnings.toFixed(0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Estimativa mensal</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
          <CardDescription>
            Continue sua jornada com estas ações recomendadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.totalOpportunities === 0 && (
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Identifique sua primeira oportunidade
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vá para a aba "Oportunidades" e descubra nichos lucrativos no Instagram e WhatsApp
                  </p>
                </div>
              </div>
            )}

            {stats.totalServices === 0 && (
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Crie seu primeiro serviço digital
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use a aba "Serviços" para gerar textos de anúncio e páginas de venda com IA
                  </p>
                </div>
              </div>
            )}

            {stats.totalAutomations === 0 && stats.totalServices > 0 && (
              <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Configure sua primeira automação
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatize mensagens e entregas para escalar seu negócio na aba "Automação"
                  </p>
                </div>
              </div>
            )}

            {stats.totalServices > 0 && stats.totalAutomations > 0 && (
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Parabéns! Você está no caminho certo
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continue criando serviços e otimizando suas automações para aumentar sua renda
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
