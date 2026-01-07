"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Users, Search, Sparkles, Instagram, MessageCircle, Plus } from "lucide-react";
import { toast } from "sonner";

interface Opportunity {
  id: string;
  title: string;
  platform: "instagram" | "whatsapp";
  niche: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedRevenue: number;
  description: string;
  tips: string[];
  createdAt: string;
}

const OPPORTUNITY_TEMPLATES = [
  {
    title: "Criação de Bio Profissional",
    platform: "instagram" as const,
    niche: "Personal Branding",
    difficulty: "easy" as const,
    estimatedRevenue: 50,
    description: "Crie bios otimizadas para perfis do Instagram que atraem seguidores e convertem em clientes.",
    tips: [
      "Use palavras-chave relevantes para o nicho",
      "Inclua call-to-action claro",
      "Destaque benefícios únicos",
      "Adicione emojis estratégicos"
    ]
  },
  {
    title: "Templates de Stories para Vendas",
    platform: "instagram" as const,
    niche: "E-commerce",
    difficulty: "easy" as const,
    estimatedRevenue: 100,
    description: "Desenvolva templates de stories prontos para usar que aumentam conversões de produtos.",
    tips: [
      "Crie senso de urgência",
      "Use cores que chamam atenção",
      "Inclua depoimentos de clientes",
      "Adicione link direto para compra"
    ]
  },
  {
    title: "Mensagens de Vendas Automatizadas",
    platform: "whatsapp" as const,
    niche: "Vendas Diretas",
    difficulty: "medium" as const,
    estimatedRevenue: 200,
    description: "Crie sequências de mensagens persuasivas para WhatsApp que convertem leads em clientes.",
    tips: [
      "Personalize com nome do cliente",
      "Responda objeções comuns",
      "Ofereça valor antes de vender",
      "Inclua prova social"
    ]
  },
  {
    title: "Legendas Virais para Reels",
    platform: "instagram" as const,
    niche: "Criadores de Conteúdo",
    difficulty: "medium" as const,
    estimatedRevenue: 150,
    description: "Escreva legendas engajadoras que aumentam alcance e interação em Reels.",
    tips: [
      "Use ganchos poderosos no início",
      "Conte histórias envolventes",
      "Faça perguntas para engajamento",
      "Inclua hashtags estratégicas"
    ]
  },
  {
    title: "Scripts de Atendimento ao Cliente",
    platform: "whatsapp" as const,
    niche: "Atendimento",
    difficulty: "easy" as const,
    estimatedRevenue: 80,
    description: "Desenvolva scripts profissionais para atendimento que melhoram satisfação do cliente.",
    tips: [
      "Seja cordial e empático",
      "Resolva problemas rapidamente",
      "Ofereça soluções alternativas",
      "Finalize com follow-up"
    ]
  },
  {
    title: "Campanhas de Lançamento",
    platform: "instagram" as const,
    niche: "Infoprodutos",
    difficulty: "hard" as const,
    estimatedRevenue: 500,
    description: "Crie campanhas completas de lançamento para produtos digitais com alta conversão.",
    tips: [
      "Construa antecipação gradual",
      "Use storytelling emocional",
      "Ofereça bônus exclusivos",
      "Crie escassez real"
    ]
  }
];

export default function OpportunityFinder() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Carregar oportunidades salvas
    const saved = localStorage.getItem("despertar_opportunities");
    if (saved) {
      setOpportunities(JSON.parse(saved));
    }
  }, []);

  const generateOpportunity = () => {
    setIsGenerating(true);
    
    // Simular geração com IA
    setTimeout(() => {
      const template = OPPORTUNITY_TEMPLATES[Math.floor(Math.random() * OPPORTUNITY_TEMPLATES.length)];
      
      const newOpportunity: Opportunity = {
        id: Date.now().toString(),
        ...template,
        createdAt: new Date().toISOString()
      };

      const updated = [newOpportunity, ...opportunities];
      setOpportunities(updated);
      localStorage.setItem("despertar_opportunities", JSON.stringify(updated));
      
      setIsGenerating(false);
      toast.success("Nova oportunidade identificada!");
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "hard": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "Fácil";
      case "medium": return "Médio";
      case "hard": return "Avançado";
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">Identificador de Oportunidades</CardTitle>
              <CardDescription>
                Descubra micro-oportunidades lucrativas em Instagram e WhatsApp usando análise inteligente
              </CardDescription>
            </div>
            <Button
              onClick={generateOpportunity}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Oportunidade
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Opportunities List */}
      {opportunities.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma oportunidade identificada ainda
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
              Clique no botão "Buscar Oportunidade" para descobrir nichos lucrativos e ideias de serviços digitais
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        opportunity.platform === "instagram" 
                          ? "bg-gradient-to-br from-purple-500 to-pink-500" 
                          : "bg-gradient-to-br from-green-500 to-green-600"
                      }`}>
                        {opportunity.platform === "instagram" ? (
                          <Instagram className="w-5 h-5 text-white" />
                        ) : (
                          <MessageCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {opportunity.niche}
                          </Badge>
                          <Badge className={getDifficultyColor(opportunity.difficulty)}>
                            {getDifficultyLabel(opportunity.difficulty)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {opportunity.description}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      R$ {opportunity.estimatedRevenue}
                    </div>
                    <div className="text-xs text-gray-500">por serviço</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                    Dicas para Implementar:
                  </h4>
                  <ul className="space-y-2">
                    {opportunity.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
