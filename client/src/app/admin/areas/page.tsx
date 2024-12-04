'use client';

import { useEffect, useState } from 'react';

export default function AreasPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [buttonClicks, setButtonClicks] = useState(0);
    // Add an interface for Area type
    interface Area {
        _id: string;
        name: string;
        pc: string[];
        description: string;
        createdAt: string;
    }

    // Initialize state with explicit typing
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [macAddress, setMacAddress] = useState('');

    useEffect(() => {
        console.log('fetching areas');
        const fetchAreas = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/areas/load', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setAreas(data.areas);
                } else {
                    console.error('Failed to fetch areas:', data.error);
                }
            } catch (error) {
                console.error('Error fetching areas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAreas();
    }, [buttonClicks]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/areas/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to create area');
                throw new Error(data.error || 'Failed to create area');
            }

            setIsModalOpen(false);
            setButtonClicks(prev => prev + 1); // Увеличиваем счетчик после создания
        } catch (error) {
            console.error('Error creating area:', error);
        }
    };

    const handleClearAreas = async () => {
        if (!confirm('Are you sure you want to clear all areas? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch('/api/areas/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to clear areas');
                throw new Error(data.error || 'Failed to clear areas');
            }

            alert('All areas cleared successfully');
            setButtonClicks(prev => prev + 1); // Увеличиваем счетчик после очистки
        } catch (error) {
            console.error('Error clearing areas:', error);
        }
    };

    const handleDeleteArea = async (id: string) => {
        if (!confirm('Are you sure you want to delete this area? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch('/api/areas/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to delete area');
                throw new Error(data.error || 'Failed to delete area');
            }

            setSelectedArea(null); // Закрываем модальное окно
            setButtonClicks(prev => prev + 1); // Обновляем список
            alert('Area deleted successfully');
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    const handleAddPC = async (areaId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем открытие модального окна при клике на кнопку

        try {
            const response = await fetch('/api/areas/mac/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaId, mac: '' }) // Using empty string as mac since this is a new PC
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to add PC');
                return;
            }

            setButtonClicks(prev => prev + 1); // Обновляем список
            alert('PC added successfully');
        } catch (error) {
            console.error('Error adding PC:', error);
            alert('Failed to add PC');
        }
    };

    const handleAddPCByMac = async (areaId: string, mac: string) => {
        if (!mac.trim()) {
            alert('Please enter a MAC address');
            return;
        }

        try {
            const response = await fetch('/api/areas/mac/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaId, mac })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || 'Failed to add PC');
                return;
            }



            setButtonClicks(prev => prev + 1);
            setMacAddress('');
            alert('PC added successfully');
        } catch (error) {
            console.error('Error adding PC:', error);
            alert('Failed to add PC');
        }
    };

    const handleDeleteMac = async (areaId: string, mac: string) => {
        if (!confirm('Are you sure you want to delete this MAC address?')) {
            return;
        }

        try {
            const response = await fetch('/api/areas/mac/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaId, mac })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            // Update the local state immediately
            if (selectedArea && selectedArea._id === areaId) {
                setSelectedArea({
                    ...selectedArea,
                    pc: selectedArea.pc.filter((address: string) => address !== mac)
                });
            }

            // Also update the areas list
            setAreas(areas.map((area: Area) => {
                if (area._id === areaId) {
                    return {
                        ...area,
                        pc: area.pc.filter((address: string) => address !== mac)
                    };
                }
                return area;
            }));

            setButtonClicks(prev => prev + 1);
            alert('MAC address deleted successfully');
        } catch (error) {
            console.error('Error deleting MAC address:', error);
            alert('Failed to delete MAC address');
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Areas</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Create Area
                        </button>
                        <button
                            onClick={handleClearAreas}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Clear Areas
                        </button>
                    </div>
                </div>

                {/* Areas List */}
                <div className="mt-8">
                    {loading ? (
                        <div className="text-center py-4">Loading areas...</div>
                    ) : areas.length === 0 ? (
                        <div className="text-center py-4 text-gray-500">No areas found</div>
                    ) : (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {areas.map((area: Area) => (
                                <div
                                    key={area._id}
                                    className="bg-purple-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-white cursor-pointer relative group"
                                    onClick={() => setSelectedArea(area)}
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2">{area.name}</h3>
                                    <div className="text-purple-200 mb-3 truncate">{area.description}</div>
                                    <div className="text-xs text-purple-300 mb-2">
                                        PC Values: {area.pc ? area.pc.length : 0}
                                    </div>
                                    <div className="text-xs text-purple-300">
                                        Created: {new Date(area.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="absolute top-2 right-2 text-purple-200 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click for details ⓘ
                                    </div>
                                    <button
                                        onClick={(e) => handleAddPC(area._id, e)}
                                        className="mt-3 w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition-colors"
                                    >
                                        Add This PC
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Area Details Modal */}
                {selectedArea && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-purple-900 p-6 rounded-lg w-full max-w-md text-white relative">
                            <button
                                onClick={() => setSelectedArea(null)}
                                className="absolute top-4 right-4 text-purple-200 hover:text-white"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-bold mb-4">{selectedArea.name}</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-purple-200 mb-1">Description:</h3>
                                    <p className="text-white">{selectedArea.description}</p>
                                </div>

                                {selectedArea.pc && selectedArea.pc.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-purple-200 mb-2">PC Values:</h3>
                                        <div className="bg-purple-800 p-3 rounded">
                                            <div className="flex flex-wrap gap-2">
                                                {selectedArea.pc.map((pc: string, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 bg-purple-200 text-purple-900 px-3 py-1.5 rounded-full font-medium"
                                                    >
                                                        <span>{pc}</span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteMac(selectedArea._id, pc);
                                                            }}
                                                            className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                                                            title="Delete MAC address"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-2 text-xs text-purple-300">
                                                Total PC values: {selectedArea.pc.length}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-sm font-medium text-purple-200 mb-1">Created At:</h3>
                                    <p className="text-white">
                                        {new Date(selectedArea.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-purple-200 mb-1">ID:</h3>
                                    <p className="text-purple-200 text-sm font-mono">{selectedArea._id}</p>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={macAddress}
                                            onChange={(e) => setMacAddress(e.target.value)}
                                            placeholder="Enter MAC address"
                                            className="flex-1 px-3 py-2 border border-purple-700 rounded-md bg-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        />
                                        <button
                                            onClick={() => handleAddPCByMac(selectedArea._id, macAddress)}
                                            className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition-colors whitespace-nowrap"
                                        >
                                            Add Another PC
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteArea(selectedArea._id)}
                                        className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                                    >
                                        Delete Area
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Create Area Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Create New Area</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                                        rows={4}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}