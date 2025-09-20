import React from 'react';
import { X, Eye, Lightbulb, Shield, Droplets, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailedAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisType: 'wrinkles' | 'skincare';
}

const DetailedAnalysisModal: React.FC<DetailedAnalysisModalProps> = ({ 
  isOpen, 
  onClose, 
  analysisType 
}) => {
  const wrinkleAnalysis = {
    title: "Análise das Linhas de Envelhecimento – Relatório Educativo",
    sections: [
      {
        title: "Análise por Região",
        icon: <Eye className="w-5 h-5" />,
        items: [
          {
            area: "Testa",
            description: "linhas leves, ligadas à expressão.",
            severity: "low"
          },
          {
            area: "Entre sobrancelhas",
            description: "discreto \"11\", típico de tensão visual ou hábito de franzir.",
            severity: "low"
          },
          {
            area: "Olhos",
            description: "pés de galinha leves, aparecem mais em sorriso.",
            severity: "low"
          },
          {
            area: "Sulcos do nariz aos lábios",
            description: "leves, pouco perceptíveis.",
            severity: "low"
          },
          {
            area: "Textura",
            description: "uniforme, sem manchas relevantes.",
            severity: "good"
          }
        ]
      },
      {
        title: "Sugestões de Cuidados",
        icon: <Lightbulb className="w-5 h-5" />,
        recommendations: [
          {
            icon: <Sun className="w-4 h-4" />,
            text: "Protetor solar FPS 50+ diário.",
            priority: "high"
          },
          {
            icon: <Droplets className="w-4 h-4" />,
            text: "Hidratação leve pela manhã; à noite, introdução gradual de retinol ou derivados para prevenção.",
            priority: "high"
          },
          {
            icon: <Shield className="w-4 h-4" />,
            text: "Óculos de sol para reduzir contração da glabela e laterais dos olhos.",
            priority: "medium"
          },
          {
            icon: <Moon className="w-4 h-4" />,
            text: "Boa rotina de sono (7–8h) + ingestão hídrica (2L/dia).",
            priority: "medium"
          },
          {
            icon: <Lightbulb className="w-4 h-4" />,
            text: "Exercícios físicos regulares e dieta rica em vegetais e proteínas magras.",
            priority: "medium"
          }
        ]
      }
    ]
  };

  const skincareAnalysis = {
    title: "Rotina de Skincare Personalizada – Guia Completo",
    sections: [
      {
        title: "Rotina Matinal",
        icon: <Sun className="w-5 h-5" />,
        steps: [
          "Limpeza suave com gel ou espuma",
          "Tônico hidratante (opcional)",
          "Sérum com Vitamina C",
          "Hidratante facial adequado ao tipo de pele",
          "Protetor solar FPS 50+ (reaplicar a cada 2h)"
        ]
      },
      {
        title: "Rotina Noturna",
        icon: <Moon className="w-5 h-5" />,
        steps: [
          "Demaquilante (se necessário)",
          "Limpeza profunda",
          "Tônico equilibrante",
          "Retinol ou derivados (2-3x por semana)",
          "Hidratante noturno mais nutritivo",
          "Óleo facial (opcional, para peles secas)"
        ]
      },
      {
        title: "Cuidados Semanais",
        icon: <Droplets className="w-5 h-5" />,
        treatments: [
          {
            frequency: "1-2x por semana",
            treatment: "Esfoliação suave (físico ou químico)"
          },
          {
            frequency: "1x por semana",
            treatment: "Máscara hidratante ou purificante"
          },
          {
            frequency: "Conforme necessário",
            treatment: "Tratamentos específicos (manchas, acne)"
          }
        ]
      }
    ]
  };

  const currentAnalysis = analysisType === 'wrinkles' ? wrinkleAnalysis : skincareAnalysis;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentAnalysis.title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-8">
                {analysisType === 'wrinkles' ? (
                  // Análise de Rugas
                  <>
                    {/* Análise por Região */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          {wrinkleAnalysis.sections[0].icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {wrinkleAnalysis.sections[0].title}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {wrinkleAnalysis.sections[0].items.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${getSeverityColor(item.severity)}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="font-semibold text-gray-900 min-w-0 flex-shrink-0">
                                {item.area}:
                              </div>
                              <div className="text-gray-700">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sugestões */}
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          {wrinkleAnalysis.sections[1].icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {wrinkleAnalysis.sections[1].title}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {wrinkleAnalysis.sections[1].recommendations.map((rec, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${getPriorityColor(rec.priority)}`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-0.5">
                                {rec.icon}
                              </div>
                              <div className="text-gray-700">
                                {rec.text}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Análise de Skincare
                  <>
                    {skincareAnalysis.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            {section.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {section.title}
                          </h3>
                        </div>

                        {section.steps && (
                          <div className="bg-gray-50 rounded-lg p-6">
                            <ol className="space-y-3">
                              {section.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                                    {stepIndex + 1}
                                  </div>
                                  <div className="text-gray-700">{step}</div>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {section.treatments && (
                          <div className="space-y-3">
                            {section.treatments.map((treatment, treatmentIndex) => (
                              <div
                                key={treatmentIndex}
                                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="font-semibold text-blue-900 min-w-0 flex-shrink-0">
                                    {treatment.frequency}:
                                  </div>
                                  <div className="text-blue-700">
                                    {treatment.treatment}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">
                        💡 Dica Importante
                      </h4>
                      <p className="text-sm text-purple-700">
                        {analysisType === 'wrinkles' 
                          ? "Lembre-se: a prevenção é sempre mais eficaz que o tratamento. Seja consistente com os cuidados diários e consulte um dermatologista para orientações personalizadas."
                          : "A consistência é fundamental para resultados visíveis. Introduza novos produtos gradualmente e sempre faça teste de sensibilidade antes do uso completo."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DetailedAnalysisModal;