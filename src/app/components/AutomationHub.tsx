"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Zap, MessageSquare, Send, Clock, Plus, Trash2, Play, Pause } from "lucide-react";
import { toast } from "sonner";

interface Automation {
  id: string;
  name: string;
  type: "welcome" | "follow-up" | "delivery" | "reminder";
  platform: "whatsapp" | "instagram";
  message: string;
  delay: number; // em minutos
  isActive: boolean;
  triggerCount: number;
  createdAt: string;
}

const AUTOMATION_TYPES = [
  { value: "welcome", label: "Mensagem de Boas-vindas", icon: "👋" },
  { value: "follow-up", label: "Follow-up de Vendas", icon: "📈" },
  { value: "delivery", label: "Entrega de Produto", icon: "📦" },
  { value: "reminder", label: "Lembrete de Pagamento", icon: "⏰" }
];

const MESSAGE_TEMPLATES = {
  welcome: `Olá [NOME]! 👋

Seja muito bem-vindo(a)! 

Estou muito feliz em ter você aqui. 

Em breve você receberá mais informações sobre [SEU PRODUTO/SERVIÇO].

Qualquer dúvida, estou à disposição! 😊`,

  "follow-up": `Oi [NOME]! 

Vi que você demonstrou interesse em [PRODUTO/SERVIÇO].

Tem alguma dúvida que eu possa esclarecer?

Estou aqui para te ajudar! 💙`,

  delivery: `🎉 Parabéns, [NOME]!

Seu acesso ao [PRODUTO] está liberado!

📥 Link de acesso: [LINK]
🔑 Senha: [SENHA]

Aproveite e qualquer dúvida, me chame! ✨`,

  reminder: `Oi [NOME]! 

Notei que seu pagamento ainda está pendente.

Você tem até [DATA] para garantir sua vaga com o desconto especial!

Posso te ajudar com algo? 😊`
};

export default function AutomationHub() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    platform: "whatsapp",
    message: "",
    delay: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem("despertar_automations");
    if (saved) {
      setAutomations(JSON.parse(saved));
    }
  }, []);

  const handleTypeChange = (type: string) => {
    setFormData({
      ...formData,
      type,
      message: MESSAGE_TEMPLATES[type as keyof typeof MESSAGE_TEMPLATES] || ""
    });
  };

  const createAutomation = () => {
    if (!formData.name || !formData.type || !formData.message) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const newAutomation: Automation = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type as Automation["type"],
      platform: formData.platform as Automation["platform"],
      message: formData.message,
      delay: formData.delay,
      isActive: true,
      triggerCount: 0,
      createdAt: new Date().toISOString()
    };

    const updated = [newAutomation, ...automations];
    setAutomations(updated);
    localStorage.setItem("despertar_automations", JSON.stringify(updated));

    setFormData({
      name: "",
      type: "",
      platform: "whatsapp",
      message: "",
      delay: 0
    });
    setIsCreating(false);
    toast.success("Automação criada com sucesso!");
  };

  const toggleAutomation = (id: string) => {
    const updated = automations.map(auto =>
      auto.id === id ? { ...auto, isActive: !auto.isActive } : auto
    );
    setAutomations(updated);
    localStorage.setItem("despertar_automations", JSON.stringify(updated));
    toast.success("Status da automação atualizado");
  };

  const deleteAutomation = (id: string) => {
    const updated = automations.filter(auto => auto.id !== id);
    setAutomations(updated);
    localStorage.setItem("despertar_automations", JSON.stringify(updated));
    toast.success("Automação removida");
  };

  const simulateTrigger = (id: string) => {
    const updated = automations.map(auto =>
      auto.id === id ? { ...auto, triggerCount: auto.triggerCount + 1 } : auto
    );
    setAutomations(updated);
    localStorage.setItem("despertar_automations", JSON.stringify(updated));
    toast.success("Automação disparada! (simulação)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">Central de Automação</CardTitle>
              <CardDescription>
                Configure mensagens automáticas e entregas para escalar seu negócio
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsCreating(!isCreating)}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Automação
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Automação</CardTitle>
            <CardDescription>
              Configure uma automação para economizar tempo e melhorar a experiência do cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Automação</Label>
                <Input
                  placeholder="Ex: Boas-vindas novos clientes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Automação</Label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="">Selecione o tipo</option>
                  {AUTOMATION_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Plataforma</Label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                >
                  <option value="whatsapp">💬 WhatsApp</option>
                  <option value="instagram">📱 Instagram</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Atraso (minutos)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.delay}
                  onChange={(e) => setFormData({ ...formData, delay: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mensagem</Label>
              <Textarea
                placeholder="Digite a mensagem que será enviada automaticamente..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[200px]"
              />
              <p className="text-xs text-gray-500">
                Use [NOME] para personalizar com o nome do cliente
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={createAutomation}
                className="flex-1 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Criar Automação
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreating(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Automações</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {automations.length}
                </p>
              </div>
              <Zap className="w-10 h-10 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automações Ativas</p>
                <p className="text-3xl font-bold text-green-600">
                  {automations.filter(a => a.isActive).length}
                </p>
              </div>
              <Play className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Disparos</p>
                <p className="text-3xl font-bold text-blue-600">
                  {automations.reduce((sum, auto) => sum + auto.triggerCount, 0)}
                </p>
              </div>
              <Send className="w-10 h-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Suas Automações
        </h3>

        {automations.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Nenhuma automação configurada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                Crie sua primeira automação para economizar tempo e melhorar seu atendimento
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {automations.map((automation) => (
              <Card key={automation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{automation.name}</CardTitle>
                        <Badge variant={automation.isActive ? "default" : "secondary"}>
                          {automation.isActive ? "Ativa" : "Pausada"}
                        </Badge>
                        <Badge variant="outline">
                          {automation.platform === "whatsapp" ? "💬 WhatsApp" : "📱 Instagram"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {AUTOMATION_TYPES.find(t => t.value === automation.type)?.label} • 
                        {automation.delay > 0 ? ` Atraso: ${automation.delay} min • ` : " Imediato • "}
                        Disparos: {automation.triggerCount}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAutomation(automation.id)}
                      >
                        {automation.isActive ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => simulateTrigger(automation.id)}
                        disabled={!automation.isActive}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteAutomation(automation.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {automation.message}
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
