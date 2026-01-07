"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Sparkles, Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: string;
  type: "ad" | "sales-page" | "bio" | "story" | "message";
  title: string;
  content: string;
  niche: string;
  estimatedValue: number;
  createdAt: string;
}

const SERVICE_TYPES = [
  { value: "ad", label: "Texto de Anúncio", icon: "📢" },
  { value: "sales-page", label: "Página de Vendas", icon: "💰" },
  { value: "bio", label: "Bio de Instagram", icon: "📱" },
  { value: "story", label: "Story de Vendas", icon: "📸" },
  { value: "message", label: "Mensagem WhatsApp", icon: "💬" }
];

const NICHES = [
  "Fitness e Saúde",
  "Beleza e Estética",
  "Educação Online",
  "Marketing Digital",
  "Desenvolvimento Pessoal",
  "E-commerce",
  "Alimentação Saudável",
  "Finanças Pessoais",
  "Moda e Estilo",
  "Tecnologia"
];

const AI_TEMPLATES = {
  ad: (niche: string) => `🎯 ANÚNCIO PROFISSIONAL - ${niche}

Transforme sua vida com [SEU PRODUTO/SERVIÇO]!

✨ O que você vai conquistar:
• Resultados comprovados em até 30 dias
• Método exclusivo e validado
• Suporte personalizado 24/7
• Garantia de satisfação

💎 OFERTA ESPECIAL:
De R$ 497 por apenas R$ 197
(Válido apenas hoje!)

👉 Clique no link e garanta sua vaga!

#${niche.replace(/\s/g, "")} #Transformação #Resultados`,

  "sales-page": (niche: string) => `🚀 PÁGINA DE VENDAS - ${niche}

═══════════════════════
HEADLINE PODEROSA
═══════════════════════

Descubra o método que já transformou a vida de +1.000 pessoas em [SEU NICHO]

───────────────────────
O PROBLEMA
───────────────────────

Você está cansado de:
❌ Não ver resultados reais
❌ Perder tempo com métodos que não funcionam
❌ Gastar dinheiro sem retorno

───────────────────────
A SOLUÇÃO
───────────────────────

Apresento o [NOME DO PRODUTO]:
✅ Sistema passo a passo validado
✅ Resultados em até 30 dias
✅ Suporte completo incluído

───────────────────────
DEPOIMENTOS
───────────────────────

"Mudou minha vida completamente!" - Cliente Satisfeito
⭐⭐⭐⭐⭐

───────────────────────
GARANTIA
───────────────────────

🛡️ 7 dias de garantia incondicional
Se não gostar, devolvemos 100% do seu dinheiro

───────────────────────
OFERTA ESPECIAL
───────────────────────

🎁 BÔNUS EXCLUSIVOS:
• Bônus 1: [Descrição]
• Bônus 2: [Descrição]
• Bônus 3: [Descrição]

💰 INVESTIMENTO:
De R$ 497 por apenas R$ 197

⏰ Oferta válida por tempo limitado!

👉 [BOTÃO DE COMPRA]`,

  bio: (niche: string) => `✨ Especialista em ${niche}
🎯 Ajudo você a [BENEFÍCIO PRINCIPAL]
📈 +1.000 clientes transformados
💡 Método exclusivo e comprovado
👇 Comece agora - Link abaixo`,

  story: (niche: string) => `📸 STORY DE VENDAS - ${niche}

[SLIDE 1]
🔥 ATENÇÃO!
Você não pode perder isso...

[SLIDE 2]
O que você vai ganhar:
✅ Benefício 1
✅ Benefício 2
✅ Benefício 3

[SLIDE 3]
💰 OFERTA ESPECIAL
R$ 197 (por tempo limitado!)

[SLIDE 4]
⏰ ÚLTIMAS VAGAS!
Arrasta pra cima e garanta a sua
👆👆👆`,

  message: (niche: string) => `💬 MENSAGEM WHATSAPP - ${niche}

Olá [NOME]! 👋

Tudo bem? Sou [SEU NOME], especialista em ${niche}.

Vi que você tem interesse em [TÓPICO] e queria te mostrar algo que pode te ajudar muito! 🎯

Desenvolvi um método exclusivo que já ajudou +1.000 pessoas a [RESULTADO DESEJADO].

Posso te enviar mais detalhes? É rapidinho! 😊

Aguardo seu retorno! ✨`
};

export default function ServiceCreator() {
  const [services, setServices] = useState<Service[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedNiche, setSelectedNiche] = useState<string>("");
  const [generatedContent, setGeneratedContent] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("despertar_services");
    if (saved) {
      setServices(JSON.parse(saved));
    }
  }, []);

  const generateService = () => {
    if (!selectedType || !selectedNiche) {
      toast.error("Selecione o tipo de serviço e o nicho");
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const template = AI_TEMPLATES[selectedType as keyof typeof AI_TEMPLATES];
      const content = template(selectedNiche);
      setGeneratedContent(content);
      setIsCreating(false);
      toast.success("Serviço gerado com sucesso!");
    }, 1500);
  };

  const saveService = () => {
    if (!generatedContent || !selectedType || !selectedNiche) {
      toast.error("Gere um serviço primeiro");
      return;
    }

    const serviceType = SERVICE_TYPES.find(t => t.value === selectedType);
    const estimatedValues = {
      ad: 50,
      "sales-page": 200,
      bio: 30,
      story: 80,
      message: 40
    };

    const newService: Service = {
      id: Date.now().toString(),
      type: selectedType as Service["type"],
      title: `${serviceType?.label} - ${selectedNiche}`,
      content: generatedContent,
      niche: selectedNiche,
      estimatedValue: estimatedValues[selectedType as keyof typeof estimatedValues],
      createdAt: new Date().toISOString()
    };

    const updated = [newService, ...services];
    setServices(updated);
    localStorage.setItem("despertar_services", JSON.stringify(updated));
    
    setGeneratedContent("");
    setSelectedType("");
    setSelectedNiche("");
    toast.success("Serviço salvo com sucesso!");
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copiado para a área de transferência!");
  };

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem("despertar_services", JSON.stringify(updated));
    toast.success("Serviço removido");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Criador de Serviços Digitais</CardTitle>
          <CardDescription>
            Gere textos profissionais de anúncios, páginas de venda e muito mais com IA
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Service Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Gerar Novo Serviço</CardTitle>
          <CardDescription>
            Selecione o tipo de serviço e o nicho para gerar conteúdo profissional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Serviço</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nicho de Mercado</Label>
              <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nicho" />
                </SelectTrigger>
                <SelectContent>
                  {NICHES.map((niche) => (
                    <SelectItem key={niche} value={niche}>
                      {niche}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generateService}
            disabled={isCreating || !selectedType || !selectedNiche}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isCreating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Gerando com IA...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Serviço
              </>
            )}
          </Button>

          {generatedContent && (
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label>Conteúdo Gerado</Label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatedContent)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveService}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Services */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Serviços Salvos ({services.length})
        </h3>

        {services.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Nenhum serviço criado ainda
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                Gere seu primeiro serviço digital usando os templates de IA acima
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <Badge variant="outline">{service.niche}</Badge>
                      </div>
                      <CardDescription>
                        Criado em {new Date(service.createdAt).toLocaleDateString("pt-BR")}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-4">
                        <div className="text-xl font-bold text-green-600">
                          R$ {service.estimatedValue}
                        </div>
                        <div className="text-xs text-gray-500">valor estimado</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(service.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteService(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono text-gray-700 dark:text-gray-300">
                      {service.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
